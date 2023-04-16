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


app.event('app_home_opened', async ({ event, client, context }) => {
  try {
    const result = await client.views.publish({

      /* the user that opened your app's app home */
      user_id: event.user,

      /* the view object that appears in the app home*/
      view: {
        type: 'home',
        callback_id: 'home_view',

        /* body of the view */
        blocks: [
          {
            "type": "section",
            "text": {
              "type": "mrkdwn",
              "text": "*Welcome to your _App's Home_* :tada:"
            }
          },
          {
            "type": "divider"
          },
          {
            "type": "section",
            "text": {
              "type": "mrkdwn",
              "text": "This button won't do much for now but you can set up a listener for it using the `actions()` method and passing its unique `action_id`. See an example in the `examples` folder within your Bolt app."
            }
          },
          {
            "type": "actions",
            "elements": [
              {
                "type": "button",
                "text": {
                  "type": "plain_text",
                  "text": "Click me!"
                }
              }
            ]
          }
        ]
      }
    });
  }
  catch (error) {
    console.error(error);
  }
});


app.command("/telrad", async ({ command, ack, say , respond }) => {
  await ack();
  
  await respond('processing command.... ');

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