const telradAPI = require("@services/telrad/telradAPI.js");
const telradBlocks = require("@blocks/telradBlocks.js");
const lteValidator = require("./validators/lteValidator");

const telradController = async ({ command, say, respond }) => {
  let [method, imsi, option] = command.text.split(" ");

  let validationResult = lteValidator({ method, imsi, option, respond });
  if (!validationResult) return;

  let header;
  let result;

  switch (method) {
    case "view":
      header = ":telrad: \tTelrad Sim Configuration\t :star:";
      result = await telradAPI.getSimConfig(imsi);
      break;

    case "add":
      header = ":telrad: \tTelrad Add Sim Configuration\t :heavy_plus_sign:";
      result = await telradAPI.addSimConfig(imsi);
      break;

    case "activate":
      header = ":telrad: \tTelrad Sim Activate\t :heavy_check_mark:";
      result = await telradAPI.updateActive(imsi, true);
      break;

    case "deactivate":
      header = ":telrad: \tTelrad Sim Deactivate\t :no_entry_sign:";
      result = await telradAPI.updateActive(imsi, false);
      break;

    case "speed":
      header = ":telrad: \tTelrad Update Sim Speed\t :memo:";

      if (option.includes("50")) option = "50x2";
      else if (option.includes("100")) option = "100x10";
      else option = "25x2";

      result = await telradAPI.updateSpeed(imsi, option);
      break;

    case "delete":
      header = ":telrad: \tTelrad Sim Configuration Delete\t :fire:";
      result = await telradAPI.deleteSimConfig(imsi);
      command.imsi = imsi;
      say(telradBlocks.deleteBlocks({ command, result, header }));
      return;

    default:
      respond("incorrect command");
      return;
  }

  say(telradBlocks.defaultBlocks({ command, result, header }));
};

module.exports = telradController;
