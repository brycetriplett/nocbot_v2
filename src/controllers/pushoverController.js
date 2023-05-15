const pushoverAPI = require("@services/pushover/pushoverAPI.js");
const pushoverBlocks = require("@blocks/pushoverBlocks.js");

const pushoverController = async ({ command, say, respond }) => {
  let [method, option] = command.text.split(" ");

  console.log(`${method} ${option}`);

  if (method === "pause" && option && !/^\d+$/.test(option)) {
    respond("Invalid time value for notification pause length");
    return;
  }

  let header;
  let result;

  switch (method) {
    case "pause":
      header =
        ":pushover: \tPushover Pause Alert Notifications\t :double_vertical_bar:";
      result = await pushoverAPI.pauseNotifications(option || "60");
      break;

    case "resume":
      header =
        ":pushover: \tPushover Resume Alert Notifications\t :arrow_forward:";
      result = await pushoverAPI.resumeNotifications();
      break;

    case "status":
      header = ":pushover: \tPushover Alert Notification Status\t :stopwatch:";
      result = await pushoverAPI.notificationStatus();
      break;

    default:
      respond("incorrect command");
      return;
  }
  say("we got here");
  // say(pushoverBlocks.defaultBlocks({ command, result, header }));
};

module.exports = pushoverController;
