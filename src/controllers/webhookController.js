const webhookBlocks = require("@blocks/webhookBlocks");
const taranaAPI = require("@services/tarana/taranaAPI.js");

const webhookController = async (req, res, postToSlack) => {
  // ack
  res.status(200).send("Webhook received!");

  // get the config for the device thowing the alert
  const result = await taranaAPI.getDeviceConfig(
    req.body.significantData["Device Serial Number"]
  );

  // turn all white space in the notes into spaces
  // add to request body
  req.body.notes = result.data.notes.replace(/\s+/g, " ").trim();

  // send message to the slack channel
  await postToSlack(webhookBlocks(req.body));
};

module.exports = webhookController;
