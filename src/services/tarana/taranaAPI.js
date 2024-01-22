const axios = require("axios");

const hosturl = process.env.TARANA_API_URL;
const api_key = process.env.TARANA_API_KEY;

const startSpeedTest = (serial) =>
  axios({
    method: "POST",
    headers: { "x-api-key": api_key },
    url: `${hosturl}/v1/network/radios/${serial}/speed-test`,
  }).then((response) => {
    return response.data.message;
  });

module.exports = {
  startSpeedTest,
};
