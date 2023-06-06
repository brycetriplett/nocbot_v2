require("module-alias/register");
require("dotenv").config();

const { App } = require("@slack/bolt");

const controllers = require("@controllers");

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: true,
  appToken: process.env.APP_TOKEN,
  extendedErrorHandler: true,
});

app.use(async ({ ack, respond, next }) => {
  await ack();
  await respond("processing command....");
  await next();
});

app.command("/telrad", controllers.telradController);
app.command("/ericsson", controllers.ericssonController);
app.command("/pushover", controllers.pushoverController);
app.command("/pppoe", controllers.pppoeController);

app.error(controllers.errorController(app));

(async () => {
  const port = 3000;
  await app.start(process.env.PORT || port);
  console.log(`Slack Bolt app is running on port ${port}!`);
})();
