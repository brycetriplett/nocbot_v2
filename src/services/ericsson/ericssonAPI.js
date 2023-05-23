const axios = require("axios");
const getAuth = require("./ericssonAuth");
const speed_values = require("./speeds");
const getFreeIP = require("@services/getFreeIP");
const { getSimData } = require("@services/getSimData");
const { getUsedIPs } = require("@services/ericsson/ericssonSQL");

const hosturl = `${process.env.STAR_API_METHOD}://${process.env.STAR_HOSTNAME}:${process.env.STAR_API_PORT}`;
const networkSubnet = process.env.STAR_NETWORK_SUBNET;

const getSimConfig = (imsi) => {
  const uri = `/hss/v1/subs/${imsi}`;
  const method = "GET";

  const auth = getAuth(method, uri);

  return axios({
    method: method,
    url: hosturl + uri,
    headers: {
      Authorization: `HMAC sub:${auth.hex}`,
      "Content-Type": "application/json",
      Date: auth.date,
    },
  }).then((response) => {
    return response.data.subscriber;
  });
};

const updateActive = (imsi, active) => {
  let value;
  if (active === true) {
    value = "0";
  } else if (active === false) {
    value = "1";
  } else {
    throw new Error(
      "Expected true or false value for active, received something else"
    );
  }

  const uri = `/hss/v1/subs/${imsi}`;
  const method = "PATCH";

  const auth = getAuth(method, uri);

  return axios({
    method: method,
    url: hosturl + uri,
    headers: {
      Authorization: `HMAC sub:${auth.hex}`,
      "Content-Type": "application/json",
      Date: auth.date,
    },
    data: {
      subscriber: {
        imsi: imsi,
        subs_status: value,
      },
    },
  }).then(() => {
    return getSimConfig(imsi);
  });
};

const updateSpeed = (imsi, speed) => {
  let { dl, ul } = speed_values[speed];

  const uri = `/hss/v1/subs/${imsi}`;
  const method = "PATCH";

  const auth = getAuth(method, uri);

  return axios({
    method: method,
    url: hosturl + uri,

    headers: {
      Authorization: `HMAC sub:${auth.hex}`,
      "Content-Type": "application/json",
      Date: auth.date,
    },

    data: {
      subscriber: {
        imsi: imsi,
        max_ul_bw: ul,
        max_dl_bw: dl,
        apn_profile: [
          {
            srv_sel: "softcom",
            max_ul: ul,
            max_dl: dl,
          },
        ],
      },
    },
  }).then(() => {
    return getSimConfig(imsi);
  });
};

const deleteConfig = (imsi) => {
  const uri = `/hss/v1/subs/${imsi}`;
  const method = "DELETE";

  const auth = getAuth(method, uri);

  return axios({
    method: method,
    url: hosturl + uri,
    headers: {
      Authorization: `HMAC sub:${auth.hex}`,
      "Content-Type": "application/json",
      Date: auth.date,
    },
  }).then((response) => {
    return response.status;
  });
};

const addSimConfig = async (imsi) => {
  const usedIPs = await getUsedIPs();
  const freeIP = await getFreeIP(networkSubnet, usedIPs);
  const simData = await getSimData(imsi);

  const uri = `/hss/v1/subs`;
  const method = "PUT";

  const auth = getAuth(method, uri);

  return axios({
    method: method,
    url: hosturl + uri,

    headers: {
      Authorization: `HMAC sub:${auth.hex}`,
      "Content-Type": "application/json",
      Date: auth.date,
    },

    data: {
      subscriber: {
        imsi: imsi,
        msisdn: imsi.substring(5),
        ki: simData.k,
        opc: simData.opc,
        subs_status: "0",
        nam: "2",
        odb: "0",
        hplmn_odb: "0",
        access_rest: "0",
        max_ul_bw: "100000000",
        max_dl_bw: "100000000",
        apn_profile: [
          {
            srv_sel: "softcom",
            srv_pty_ip: freeIP,
            pdn_type: "0",
            max_ul: "100000000",
            max_dl: "100000000",
            qos_classid: "6",
            pri_level: "6",
            preem_cap: "1",
            preem_vul: "0",
            as_default: "1",
          },
        ],
      },
    },
  }).then(() => {
    return getSimConfig(imsi);
  });
};

module.exports = {
  getSimConfig,
  updateActive,
  updateSpeed,
  deleteConfig,
  addSimConfig,
};
