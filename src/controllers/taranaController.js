const taranaAPI = require("@services/tarana/taranaAPI.js");
const taranaBlocks = require("@blocks/taranaBlocks.js");

const taranaController = async ({ command, say, respond }) => {
  let [method, serial, option] = command.text.split(" ");

  let header;
  let result;

  switch (method) {
    case "speedtest":
      header = ":tarana: \tTarana Start SpeedTest\t :racing-motorcycle:";
      result = await taranaAPI.startSpeedTest(serial);
      break;

    default:
      respond("incorrect command");
      return;
  }

  say(taranaBlocks.defaultBlocks({ command, result, header }));
};

module.exports = taranaController;
