const forge = require("node-forge");

const key_str = process.env.STAR_API_KEY_STR;

const getAuth = (method, uri) => {
  // get date
  const date = new Date().toUTCString();

  // convert key string into byte array
  const convertFromHex = forge.util.hexToBytes(key_str);
  const byteArray = forge.util.createBuffer(convertFromHex, "raw");

  // create hmac message
  const hmac = forge.hmac.create();
  hmac.start("sha256", byteArray);
  hmac.update(`${method}\n${uri}\n${date}\n`);

  // return hex value of message and the date used
  return { hex: hmac.digest().toHex(), date: date };
};

module.exports = getAuth;
