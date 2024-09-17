const { webhookBlocks } = require("@blocks/webhookBlocks");
const taranaAPI = require("@services/tarana/taranaAPI.js");

const webhookController = async (req, res, postToSlack) => {
  // ack
  res.status(200).send("Webhook received!");

  // check if the serial value is actually a serial or test data
  const serial = req.body.significantData["Device Serial Number"];
  if (/^[A-Z0-9]{8,12}$/.test(serial)) {
    // if serial, grab config
    const result = await taranaAPI.getDeviceConfig(serial);

    // turn all white space in the notes into spaces
    // add to request body
    req.body.notes = result.data.notes.replace(/\s+/g, " ").trim();
  } else {
    // add dummy data for api testing
    req.body.notes = "this is a test";
  }

  //send message to the slack channel
  return webhookBlocks(req.body);
};

module.exports = webhookController;
