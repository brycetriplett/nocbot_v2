const axios = require("axios");

const hosturl = process.env.TARANA_API_URL;
const api_key = process.env.TARANA_API_KEY;

const headers = {
  accept: "application/json",
  "Content-Type": "application/json",
  "x-api-key": api_key,
};

const startSpeedTest = (serial) =>
  axios({
    method: "POST",
    headers: headers,
    url: `${hosturl}/v1/network/radios/${serial}/speed-test`,
  })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      if (error.response && error.response.status === 403) {
        const errorMessage = {
          code: 403,
          message: `${serial} is either not accessible for user or is not a valid serial number`,
        };
        throw errorMessage;
      } else {
        throw error;
      }
    });

module.exports = {
  startSpeedTest,
};
