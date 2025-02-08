require("module-alias/register");
require("dotenv").config();
const fs = require("fs");
const https = require("https");
const { App, LogLevel } = require("@slack/bolt");
const express = require("express");
const bodyParser = require("body-parser");
const crypto = require("crypto");

const controllers = require("@controllers");
const { webhookBlocks } = require("@blocks/webhookBlocks");

// Initialize Slack Bolt app
const slackApp = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: true,
  appToken: process.env.APP_TOKEN,
  extendedErrorHandler: true,
  logLevel: LogLevel.DEBUG, // Optional: set the log level to DEBUG for more verbose logs
});

// Middleware for Slack slash commands. Lets the user know that the command was accepted
slackApp.use(async ({ ack, respond, next }) => {
  await ack();
  await respond("processing command....");
  await next();
});

// slack slash commands
slackApp.command("/telrad", controllers.telradController);
slackApp.command("/ericsson", controllers.ericssonController);
slackApp.command("/tarana", controllers.cbrsTaranaController);
slackApp.command("/pushover", controllers.pushoverController);
slackApp.command("/pppoe", controllers.pppoeController);
slackApp.command("/ping", controllers.pingController);

// all errors in this application are sent to a slack channel
// do not use try
slackApp.error(controllers.errorController(slackApp));

// Initialize Express app for listening to webhooks
const expressApp = express();
expressApp.use(bodyParser.json());

// Function to post a message to the tarana_alerts slack channel for webhooks
async function postToSlack(blocks) {
  await slackApp.client.chat.postMessage({
    channel: "C07M3EJQQTZ",
    text: "fallback message",
    blocks: blocks,
  });
}

// endpoint for listening to incoming webhooks
expressApp.post("/webhook", async (req, res) => {
  const signature = req.headers["x-tarana-signature"];
  const requestBody = JSON.stringify(req.body);

  const webhook = process.env.TARANA_WEBHOOK_SECRET;
  const cbrs_webhook = process.env.CBRS_TARANA_WEBHOOK_SECRET;

  const secretCheck = (secret) => {
    const hmac = crypto.createHmac("sha256", secret);
    hmac.update(requestBody);
    return hmac.digest("base64");
  };

  const webhookEncrypt = secretCheck(webhook);
  const cbrsWebhookEncrypt = secretCheck(cbrs_webhook);

  let cbrs;

  switch (signature) {
    case webhookEncrypt:
      cbrs = false;
      break;

    case cbrsWebhookEncrypt:
      cbrs = true;

    default:
      break;
  }

  await controllers.webhookController(req, res, cbrs, postToSlack);
});

// Load SSL certificate and key
const sslOptions = {
  key: fs.readFileSync("src/key.pem"),
  cert: fs.readFileSync("src/cert.pem"),
};

// Start Slack Bolt and Express
(async () => {
  const slackPort = process.env.SLACK_PORT || 3000;
  const expressPort = process.env.EXPRESS_PORT || 8888;

  // Start Slack Bolt app
  await slackApp.start(slackPort);
  console.log(`Slack Bolt app is running on port ${slackPort}!`);

  // Start HTTPS server for Express
  https.createServer(sslOptions, expressApp).listen(expressPort, () => {
    console.log(`Express server with SSL is running on port ${expressPort}!`);
  });
})();
