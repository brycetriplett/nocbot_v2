const { webhookBlocks } = require("@blocks/webhookBlocks");
const taranaAPI = require("@services/tarana/taranaAPI.js");
const cbrsTaranaAPI = require("@services/tarana/cbrsTaranaAPI.js");

const webhookController = async (req, res, cbrs, postToSlack) => {
  // ack
  res.status(200).send("Webhook received!");

  console.log(req.body.significantData["Device Serial Number"]);
  // check if the serial value is actually a serial or test data
  const serial = req.body.significantData["Device Serial Number"];

  if (/^[A-Z0-9]{8,16}$/.test(serial)) {
    // if serial, grab config
    try {
      let result;
      if (cbrs === false) {
        result = await taranaAPI.getDeviceConfig(serial);
      } else if (cbrs === true) {
        result = await cbrsTaranaAPI.getDeviceConfig(serial);
      }
      req.body.notes = result.data.notes.replace(/\s+/g, " ").trim();
    } catch {
      req.body.notes = "error looking up serial number";
    }
  } else {
    // add dummy data for api testing
    req.body.notes = "this is a test";
  }

  //send message to the slack channel
  await postToSlack(webhookBlocks(req.body));
};

module.exports = webhookController;
