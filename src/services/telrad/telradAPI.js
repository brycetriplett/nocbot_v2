const { xml2js } = require("xml-js");
const axios = require("axios");

const sql = require("@services/getSimData");
const getFreeIP = require("@services/getFreeIP");

const username = process.env.BREEZEVIEW_USERNAME;
const password = process.env.BREEZEVIEW_PASSWORD;
const hosturl = process.env.BREEZEVIEW_HOSTURL;
const networkSubnet = process.env.BREEZEVIEW_MANAGED_SUBNET;

const auth =
  "Basic " + Buffer.from(`${username}:${password}`).toString("base64");

const getSimConfig = (imsi) =>
  axios({
    method: "GET",
    url: `${hosturl}/restconf/data/LTE_COMPACT_NCS_NETWORKING:LTENetwork/LTE_EPC_CENTRALIZED_HSS_CM:HSS/SubscribersList=${imsi}`,

    headers: {
      Authorization: auth,
    },
  }).then((response) => {
    return xml2js(response.data, { compact: true, ignoreAttributes: true })
      .SubscribersList;
  });

const updateSpeed = (imsi, speed) =>
  axios({
    method: "PATCH",
    url: `${hosturl}/restconf/data/LTE_COMPACT_NCS_NETWORKING:LTENetwork/LTE_EPC_CENTRALIZED_HSS_CM:HSS/SubscribersList=${imsi}`,

    headers: {
      "Content-Type": "application/yang-data+xml",
      Authorization: auth,
    },
    data: `
      <SubscribersList>
        <AssociatedGlobalServiceProfileName>${speed}</AssociatedGlobalServiceProfileName>
      </SubscribersList>
    `,
  }).then(() => {
    return getSimConfig(imsi);
  });

const updateActive = (imsi, active) => {
  let value;
  if (active === true) {
    value = "Active";
  } else if (active === false) {
    value = "Inactive";
  } else {
    throw new Error(
      "Expected true or false value for active, received something else"
    );
  }

  return axios({
    method: "PATCH",
    url: `${hosturl}/restconf/data/LTE_COMPACT_NCS_NETWORKING:LTENetwork/LTE_EPC_CENTRALIZED_HSS_CM:HSS/SubscribersList=${imsi}`,
    headers: {
      "Content-Type": "application/yang-data+xml",
      Authorization: auth,
    },
    data: `
      <SubscribersList>
        <ImsiActivation>${value}</ImsiActivation>
      </SubscribersList>
    `,
  }).then(() => {
    return getSimConfig(imsi);
  });
};

const deleteSimConfig = (imsi) =>
  axios({
    method: "DELETE",
    url: `${hosturl}/restconf/data/LTE_COMPACT_NCS_NETWORKING:LTENetwork/LTE_EPC_CENTRALIZED_HSS_CM:HSS/SubscribersList=${imsi}`,
    headers: {
      "Content-Type": "application/yang-data+xml",
      Authorization: auth,
    },
  }).then((response) => {
    return response.status;
  });

const getUsedIPs = () =>
  axios({
    method: "GET",
    url: `${hosturl}/restconf/data/LTE_COMPACT_NCS_NETWORKING:LTENetwork/LTE_EPC_CENTRALIZED_HSS_CM:HSS`,

    headers: {
      Authorization: auth,
    },
  }).then((response) => {
    const jsonData = xml2js(response.data, {
      compact: true,
      ignoreAttributes: true,
    }).HSS.SubscribersList;

    let result = [];
    jsonData.forEach((item) => {
      if (item.PdnAddressAllocation) {
        result.push(item.PdnAddressAllocation._text);
      }
    });

    return result;
  });

const addSimConfig = async (imsi) => {
  const usedIPs = await getUsedIPs();
  const freeIP = await getFreeIP(networkSubnet, usedIPs);
  const simData = await sql.getSimData(imsi);

  await axios({
    method: "POST",
    url: `${hosturl}/restconf/data/LTE_COMPACT_NCS_NETWORKING:LTENetwork/LTE_EPC_CENTRALIZED_HSS_CM:HSS`,
    headers: {
      Authorization: auth,
      "Content-Type": "application/yang-data+xml",
    },
    data: `
      <SubscribersList>
        <IMSI>${imsi}</IMSI>
        <AuthenticationKey>${simData.k}</AuthenticationKey>
        <OpcPresent>OPCValueUsed</OpcPresent>
        <OPorOPC>${simData.opc}</OPorOPC>
        <ImsiActivation>Active</ImsiActivation>
        <AssociatedGlobalServiceProfileName>100x10</AssociatedGlobalServiceProfileName>
        <PdnAddressAllocation>${freeIP}</PdnAddressAllocation>
        <AllowedEPCs>all</AllowedEPCs>
      </SubscribersList>
    `,
  });

  return getSimConfig(imsi);
};

module.exports = {
  getSimConfig,
  deleteSimConfig,
  addSimConfig,
  updateActive,
  updateSpeed,
};
