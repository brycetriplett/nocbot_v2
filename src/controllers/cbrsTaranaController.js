const cbrsTaranaAPI = require("@services/tarana/cbrsTaranaAPI.js");
const taranaBlocks = require("@blocks/taranaBlocks.js");

const cbrsTaranaController = async ({ command, say, respond }) => {
  let [method, serial, option] = command.text.split(" ");

  let header;
  let result;

  switch (method) {
    case "speedtest":
      header = ":tarana: \tTarana Start Speed Test\t :racing_motorcycle:";
      result = await cbrsTaranaAPI.startSpeedTest(serial);
      break;

    default:
      respond("incorrect command");
      return;
  }

  if (!result.error) {
    say(taranaBlocks.defaultBlocks({ command, result, header }));
  } else {
    const errorMessage = result.error.message;
    throw new Error(errorMessage);
  }
};

module.exports = cbrsTaranaController;
