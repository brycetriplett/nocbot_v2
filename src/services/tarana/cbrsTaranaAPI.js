const axios = require("axios");

const hosturl = process.env.CBRS_TARANA_API_URL;
const api_key = process.env.CBRS_TARANA_API_KEY;

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

const getDeviceConfig = (serial) =>
  axios({
    method: "GET",
    headers: headers,
    url: `${hosturl}/v2/network/radios/${serial}`,
  })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      if (error.response) {
        if (error.response.status === 403) {
          const errorMessage = {
            code: 403,
            message: `${serial} is either not accessible for the user or is not a valid serial number`,
          };
          throw errorMessage;
        } else if (error.response.status === 404) {
          const errorMessage = {
            code: 404,
            message: `Device with serial number ${serial} was not found`,
          };
          throw errorMessage;
        }
      }
      // If the error is not a 403 or 404, throw the original error
      throw error;
    });

  const getSlaList = () =>
    axios({
      method: "GET",
      headers: headers,
      url: `${hosturl}/v1/network/operators/sla-profiles`,
    })
      .then((response) => {
        return response.data.data.map(x => x.profileId).join(", ");
      })
      .catch((error) => {
        throw error;
      });

  const changeSla = (serial, profile) =>
    axios({
      method: "PATCH",
      headers: headers,
      url: `${hosturl}/v1/network/radios/${serial}`,
      data: {
        slaProfile: profile,
      },
    })
      .then(() => {
        return getDeviceConfig(serial);
      })
      .catch((error) => {
        if (error.response && error.response.status === 403) {
          const errorMessage = {
            code: 403,
            message: `${serial} is either not accessible for user or is not a valid serial number`,
          };
          throw errorMessage;
        } else if (error.response && error.response.status === 400) {
          const errorMessage = {
            code: 400,
            message: `SLA profile used is not valid. Please execute "/tarana slalist" to get a list of valid SLA profiles`,
          };
          throw errorMessage
          
        } else {
          throw error;
        }
      });

module.exports = {
  startSpeedTest,
  getDeviceConfig,
  getSlaList,
  changeSla,
};
