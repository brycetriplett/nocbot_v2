const ericssonAPI = require("@services/ericsson/ericssonAPI");
const ericssonBlocks = require("@blocks/ericssonBlocks");
const lteValidator = require("./validators/lteValidator");

const ericssonController = async ({ command, say, respond }) => {
  let [method, imsi, option] = command.text.split(" ");

  let validationResult = lteValidator({ method, imsi, option, respond });
  if (!validationResult) return;

  let header;
  let result;

  switch (method) {
    case "view":
      header = ":ericssonlogo: \tEricsson Sim Configuration\t :star:";
      result = await ericssonAPI.getSimConfig(imsi);
      break;

    case "add":
      header =
        ":ericssonlogo: \tEricsson Add Sim Configuration\t :heavy_plus_sign:";
      result = await ericssonAPI.addSimConfig(imsi);
      break;

    case "activate":
      header = ":ericssonlogo: \tEricsson Sim Activate\t :heavy_check_mark:";
      result = await ericssonAPI.updateActive(imsi, true);
      break;

    case "deactivate":
      header = ":ericssonlogo: \tEricsson Sim Deactivate\t :no_entry_sign:";
      result = await ericssonAPI.updateActive(imsi, false);
      break;

    case "speed":
      header = ":ericssonlogo: \tEricsson Update Sim Speed\t :memo:";

      if (option.includes("50")) option = "50";
      else if (option.includes("100")) option = "100";
      else option = "25";

      result = await ericssonAPI.updateSpeed(imsi, option);
      break;

    case "delete":
      header = ":ericssonlogo: \tEricsson Sim Configuration Delete\t :fire:";
      result = await ericssonAPI.deleteConfig(imsi);
      command.imsi = imsi;
      say(ericssonBlocks.deleteBlocks({ command, result, header }));
      return;

    default:
      respond("incorrect command");
      return;
  }

  say(ericssonBlocks.defaultBlocks({ command, result, header }));
};

module.exports = ericssonController;
