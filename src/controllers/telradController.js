const telrad = require("@services/telrad.js");
const telradBlocks = require("@blocks/telradBlocks.js");

const telradController = async ({ command, say, respond }) => {
  let [method, imsi, option] = command.text.split(" ");

  if (method === "view") {
    const header = ":star: Telrad Sim Configuration";
    const result = await telrad.getSimConfig(imsi);

    say(telradBlocks.defaultBlocks(command, result, header));
  } else if (method === "delete") {
    const header = ":fire: Telrad Sim Configuration Delete";
    const result = await telrad.deleteSimConfig(imsi);

    say(telradBlocks.deleteBlocks(imsi, command.user_name, result, header));
  } else if (method === "add") {
    const header = ":heavy_plus_sign: Telrad Add Sim Configuration";
    const result = await telrad.addSimConfig(imsi);

    say(telradBlocks.defaultBlocks(command, result, header));
  } else if (method === "activate") {
    const header = ":heavy_check_mark: Telrad Sim Activate";
    const result = await telrad.updateActive(imsi, true);

    say(telradBlocks.defaultBlocks(command, result, header));
  } else if (method === "deactivate") {
    const header = ":no_entry_sign: Telrad Sim Deactivate";
    const result = await telrad.updateActive(imsi, false);

    say(telradBlocks.defaultBlocks(command, result, header));
  } else if (method === "speed") {
    const header = ":memo: Telrad Update Sim Speed";

    if (option.includes("50")) option = "50x2";
    else if (option.includes("100")) option = "100x10";
    else option = "25x2";

    const result = await telrad.updateSpeed(imsi, option);

    say(telradBlocks.defaultBlocks(command, result, header));
  } else {
    respond("incorrect command");
  }
};

module.exports = telradController;
