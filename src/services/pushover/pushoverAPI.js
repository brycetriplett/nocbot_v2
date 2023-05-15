const axios = require("axios");

const hosturl = process.env.PUSHOVER_HOST_URL;

const pauseNotifications = (time) =>
  axios({
    method: "GET",
    url: `${hosturl}/block-posts?time=${time}`,
  }).then((response) => {
    return response.data.message;
  });

const resumeNotifications = () =>
  axios({
    method: "GET",
    url: `${hosturl}/unblock-posts`,
  }).then((response) => {
    return response.data.message;
  });

const notificationStatus = () =>
  axios({
    method: "GET",
    url: `${hosturl}/time-left`,
  }).then((response) => {
    return response.data.message;
  });

module.exports = {
  pauseNotifications,
  resumeNotifications,
  notificationStatus,
};
