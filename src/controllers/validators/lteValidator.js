const lteValidator = ({ method, imsi, option, respond }) => {
  if (!/^\d+$/.test(imsi)) {
    respond("IMSI either contains letters or is in the wrong place");
    return false;
  } else if (imsi.length < 15) {
    respond("Incorrect IMSI Length");
    return false;
  } else if (method === "speed" && (!option || !/25|50|100/.test(option))) {
    respond("Invalid or missing speed profile");
    return false;
  }
  return true;
};

module.exports = lteValidator;
