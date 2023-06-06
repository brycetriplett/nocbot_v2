const axios = require("axios");

const hosturl = process.env.PPPOE_HOST_URL;

const getAuth = () => {
  const apiurl = "/v1/user/login";

  const data = {
    username: process.env.PPPOE_USERNAME,
    password: process.env.PPPOE_PASSWORD,
  };

  return axios({
    method: "POST",
    url: hosturl + apiurl,
    data: data,
  }).then((response) => {
    return response.headers["authorization"];
  });
};

const getBngid = async () => {
  const auth = await getAuth();

  const apiurl = "/v1/bngs";

  return axios({
    method: "GET",
    url: hosturl + apiurl,
    headers: { Authorization: auth },
  }).then((response) => {
    return [auth, response.data.result[0].id];
  });
};

const getUserInfo = async (username) => {
  const [auth, bngid] = await getBngid();

  const apiurl = `/v1/userinfo?actualbngid=${bngid}&username=${username}`;

  return axios({
    method: "GET",
    url: hosturl + apiurl,
    headers: { Authorization: auth },
  }).then((response) => {
    return response.data;
  });
};

const kickUser = async (userInfo) => {
  const [auth, bngid] = await getBngid();

  const apiurl = "/v1/bulkuser/bulkclearuser";

  for (let x = 0; x < userInfo.count; x++) {
    await axios({
      method: "POST",
      url: hosturl + apiurl,
      headers: { Authorization: auth },
      data: {
        id: bngid,
        userId: [
          {
            id: userInfo.result[x]["id"],
          },
        ],
      },
    });
  }
};

module.exports = {
  getAuth,
  getBngid,
  getUserInfo,
  kickUser,
};
