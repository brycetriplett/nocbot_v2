const ip = require("netmask");

const getFreeIP = async (networkSubnet, usedIPs) => {
  const iPBlock = new ip.Netmask(networkSubnet);

  let result;

  try {
    iPBlock.forEach((item) => {
      const lastOctet = item.split(".")[3];

      if (!["0", "1", "255"].includes(lastOctet) && !usedIPs.includes(item)) {
        result = item;
        throw new Error("Found IP");
      }
    });
  } catch (error) {
    if (error.message !== "Found IP") throw error;
  }

  return result;
};

module.exports = getFreeIP;
