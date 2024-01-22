const axios = require("axios");

const hosturl = process.env.TARANA_API_URL;
const api_key = process.env.TARANA_API_KEY;

const headers = {
  accept: "application/json",
  "x-api-key": api_key,
};

const startSpeedTest = (serial) =>
  axios({
    method: "POST",
    headers: headers,
    url: `${hosturl}/v1/network/radios/${serial}/speed-test`,
    data: "{}",
  }).then((response) => {
    return response.data.message;
  });

module.exports = {
  startSpeedTest,
};
