const { App } = require("@slack/bolt");
require("dotenv").config();

const processors = require("./processors.js");
const blocks = require("./blocks.js");


const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: true,
  appToken: process.env.APP_TOKEN
});


app.command("/telrad", async ({ command, ack, say , respond }) => {
  await ack();

  await processors.telradProcessor(command, respond)
    .then((response) => {
      if (response) say(response)
      else respond("incorrect command")
    })

    .catch(async (err) => {
      const errorBlocks = blocks.errorBlocks(command, err)
      respond(errorBlocks)

      await app.client.chat.postMessage({
        channel: 'nocbot_error',
        text: "fallback text",
        blocks: errorBlocks.blocks
      })
    })

});


(async () => {
  const port = 3000
  await app.start(process.env.PORT || port);
  console.log(`Slack Bolt app is running on port ${port}!`);
})();