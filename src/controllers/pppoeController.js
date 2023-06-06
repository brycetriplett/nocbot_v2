const pppoeAPI = require("@services/pppoe/pppoeAPI.js");
const pppoeBlocks = require("@blocks/pppoeBlocks.js");
const pppoeSchema = require("./schemas/pppoeSchema");

let Ajv = require("ajv");
let ajv = new Ajv();
let validate = ajv.compile(pppoeSchema);

const pppoeController = async ({ command, say, respond }) => {
  let [method, username, option] = command.text.split(" ");
  command.username = username;

  const result = await pppoeAPI.getUserInfo(username);
  let header;

  switch (method) {
    case "view":
      header = ":pppoe: \tPPPoE View Login\t :star:";
      if (!validate(result))
        say(pppoeBlocks.noLoginBlocks({ command, header }));
      else say(pppoeBlocks.viewBlocks({ command, result, header }));
      break;

    case "kick":
      header = ":pppoe: \tPPPoE Kick User\t :wave:";
      if (!validate(result))
        say(pppoeBlocks.noLoginBlocks({ command, header }));
      else {
        await pppoeAPI.kickUser(result);
        say(pppoeBlocks.kickBlocks({ command, header }));
      }
      break;

    default:
      respond("incorrect command");
      break;
  }
};

module.exports = pppoeController;
