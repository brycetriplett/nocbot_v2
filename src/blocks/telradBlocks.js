const defaultBlocks = ({ command, result, header }) => {
  const [dl, ul] = result.AssociatedGlobalServiceProfileName._text.split("x");

  return {
    text: "fallback message",
    blocks: [
      {
        type: "header",
        text: {
          type: "plain_text",
          text: header,
          emoji: true,
        },
      },
      {
        type: "divider",
      },
      {
        type: "section",
        fields: [
          {
            type: "plain_text",
            text: `IMSI: ${result?.IMSI?._text}`,
            emoji: true,
          },
          {
            type: "plain_text",
            text: `IP: ${result?.PdnAddressAllocation?._text}`,
            emoji: true,
          },
          {
            type: "plain_text",
            text: `Activation: ${result?.ImsiActivation?._text}`,
            emoji: true,
          },
          {
            type: "plain_text",
            text: `Speed Profile: Freedom ${dl}`,
            emoji: true,
          },
        ],
      },
      {
        type: "context",
        elements: [
          {
            type: "mrkdwn",
            text: `Command executed by *${command.user_name}*`,
          },
        ],
      },
      {
        type: "context",
        elements: [
          {
            type: "plain_text",
            text: "\n",
            emoji: true,
          },
        ],
      },
    ],
  };
};

const deleteBlocks = ({ command, result, header }) => {
  return {
    text: "fallback message",
    blocks: [
      {
        type: "header",
        text: {
          type: "plain_text",
          text: header,
          emoji: true,
        },
      },
      {
        type: "divider",
      },
      {
        type: "section",
        fields: [
          {
            type: "plain_text",
            text: `IMSI: ${command.imsi}`,
            emoji: true,
          },
          {
            type: "plain_text",
            text: `Result: Success`,
            emoji: true,
          },
        ],
      },
      {
        type: "context",
        elements: [
          {
            type: "mrkdwn",
            text: `Command executed by *${command.user_name}*`,
          },
        ],
      },
      {
        type: "section",
        text: {
          type: "plain_text",
          text: "\n",
          emoji: true,
        },
      },
    ],
  };
};

module.exports = {
  defaultBlocks,
  deleteBlocks,
};
