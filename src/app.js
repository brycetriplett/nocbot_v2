require("module-alias/register");
require("dotenv").config();

const { App } = require("@slack/bolt");

const errorBlocks = require("@blocks/errorBlocks.js");

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: true,
  appToken: process.env.APP_TOKEN,
});

app.use(async ({ ack, respond, next }) => {
  await ack();
  await respond("processing command....");
  await next();
});

app.command("/telrad", async ({ command, say, respond }) => {
  await controllers.telradController({ command, say, respond });
});

app.error(async ({ error, context, command, respond }) => {
  const blocks = errorBlocks(command, error);
  respond(blocks);

  await app.client.chat.postMessage({
    channel: "nocbot_error",
    text: "fallback text",
    blocks: blocks,
    token: context.botToken,
  });
});

(async () => {
  const port = 3000;
  await app.start(process.env.PORT || port);
  console.log(`Slack Bolt app is running on port ${port}!`);
})();
