const pingBlocks = require("@blocks/pingBlocks");
const ipValidator = require("./validators/ipValidator");
const ping = require("ping");

const pingController = async ({ command, say, respond }) => {
  let host = command.text;
  if (!ipValidator(host)) return respond("IP address is not correct");

  let header =
    ":globe_with_meridians: \tPing IP Address\t :table_tennis_paddle_and_ball:";
  ping.promise
    .probe(host)
    .then((res) => {
      let result = `${host} ping result: ${res.alive ? "online" : "offline"}`;
      say(pingBlocks.defaultBlocks({ command, result, header }));
    })
    .catch((error) => {
      let result = `Could not ping ${host}: ${error}`;
      say(pingBlocks.defaultBlocks({ command, result, header }));
    });
};

module.exports = pingController;
