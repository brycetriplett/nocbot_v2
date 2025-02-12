const cbrsTaranaAPI = require("@services/tarana/cbrsTaranaAPI.js");
const taranaBlocks = require("@blocks/taranaBlocks.js");

const cbrsTaranaController = async ({ command, say, respond }) => {
  let [method, serial, option] = command.text.split(" ");

  let header;
  let result;
  let blocks;

  switch (method) {
    case "speedtest":
      header = ":tarana: \tTarana Start Speed Test\t :racing_motorcycle:";
      result = await cbrsTaranaAPI.startSpeedTest(serial);
      blocks = taranaBlocks.speedTestBlocks;
      break;

    case "view":
      header = ":tarana: \tTarana Device Config\t :gear:";
      result = await cbrsTaranaAPI.getDeviceConfig(serial);
      blocks = taranaBlocks.viewBlocks;
      break;

    case "slalist":
      header = ":tarana: \tTarana SLA List\t :clipboard:";
      result = await cbrsTaranaAPI.getSlaList(serial);
      blocks = taranaBlocks.slaListBlocks;
      break;

    case "changesla":
      header = ":tarana: \tTarana SLA has been changed\t :pencil:";
      result = await cbrsTaranaAPI.changeSla(serial, option);
      blocks = taranaBlocks.viewblocks;
      break;

    default:
      respond("incorrect command");
      return;
  }

  if (!result.error) {
    say(blocks({ command, result, header }));
  } else {
    const errorMessage = result.error.message;
    throw new Error(errorMessage);
  }
};

module.exports = cbrsTaranaController;
