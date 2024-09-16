require("module-alias/register");
require("dotenv").config();
const fs = require("fs");
const https = require("https");
const { App, LogLevel } = require("@slack/bolt");
const express = require("express");
const bodyParser = require("body-parser");

const controllers = require("@controllers");
const { webhookBlocks } = require("@blocks/webhookBlocks"); // Import the function correctly

// Initialize Slack Bolt app
const slackApp = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: true,
  appToken: process.env.APP_TOKEN,
  extendedErrorHandler: true,
  logLevel: LogLevel.DEBUG, // Optional: set the log level to DEBUG for more verbose logs
});

// Middleware for Slack commands
slackApp.use(async ({ ack, respond, next }) => {
  await ack();
  await respond("processing command....");
  await next();
});

slackApp.command("/telrad", controllers.telradController);
slackApp.command("/ericsson", controllers.ericssonController);
slackApp.command("/tarana", controllers.taranaController);
slackApp.command("/cbrs-tarana", controllers.cbrsTaranaController);
slackApp.command("/pushover", controllers.pushoverController);
slackApp.command("/pppoe", controllers.pppoeController);
slackApp.command("/ping", controllers.pingController);

slackApp.error(controllers.errorController(slackApp));

// Initialize Express app
const expressApp = express();
expressApp.use(bodyParser.json()); // Parse JSON body

// Function to post a message to Slack
async function postToSlack(blocks) {
  try {
    await slackApp.client.chat.postMessage({
      channel: "C07M3EJQQTZ", // Ensure you set this environment variable
      text: "fallback message", // This is required by Slack but can be a fallback text
      blocks: blocks,
    });
  } catch (error) {
    console.error("Error posting to Slack:", error);
  }
}

// Webhook endpoint
expressApp.post("/webhook", (req, res) => {
  console.log("Received webhook payload:", req.body);

  // Transform the incoming payload to the format required by webhookBlocks
  const {
    alertStatus,
    significantData,
    alertName,
    alertDescription,
    alertCreatedAt,
  } = req.body;

  const messageBlocks = webhookBlocks({
    alertStatus,
    significantData,
    alertName,
    alertDescription,
    alertCreatedAt,
  });

  postToSlack(messageBlocks.blocks); // Use the blocks from webhookBlocks
  res.status(200).send("Webhook received!");
});

// Load SSL certificate and key
const sslOptions = {
  key: fs.readFileSync("src/key.pem"),
  cert: fs.readFileSync("src/cert.pem"),
};

// Start Slack Bolt app
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
