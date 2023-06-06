let pppoeSchema = {
  type: "object",
  properties: {
    count: { type: "number", minimum: 1 },
    msg: { type: "string" },
    retCode: { type: "string" },
    result: {
      type: "array",
      items: {
        type: "object",
        properties: {
          actualbngId: { type: "string" },
          actualbngName: { type: "string" },
          domainName: { type: "string" },
          dot1q: { type: "string" },
          firstVlan: { type: "string" },
          groupId: { type: "string" },
          id: { type: "string" },
          innerVlan: { type: "string" },
          interface: { type: "string" },
          ipv4: { type: "string" },
          ipv6Address: { type: "array" }, // assuming array of strings
          macAddress: { type: "string" },
          onlineTime: { type: "number" },
          outerVlan: { type: "string" },
          qosProfileName: { type: "string" },
          secondVlan: { type: "string" },
          sessionId: { type: "number" },
          thirdVlan: { type: "string" },
          totalDownlinkByte: { type: "number" },
          totalUplinkByte: { type: "number" },
          username: { type: "string" },
          userType: { type: "string" },
          vlan: { type: "string" },
          vlanType: { type: "string" },
        },
      },
    },
  },
  required: ["count"],
};

module.exports = pppoeSchema;
