const defaultBlocks = ({ command, result, header, dualCheck }) => {
  const blocks = [
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
          text: `IMSI: ${result.imsi}`,
          emoji: true,
        },
        {
          type: "plain_text",
          text: `IP: ${result.apn_profile[0]["srv_pty_ip"]}`,
          emoji: true,
        },
        {
          type: "plain_text",
          text: `Activation: ${
            result.subs_status === "0" ? "Active" : "Inactive"
          }`,
          emoji: true,
        },
        {
          type: "plain_text",
          text: `Speed Profile: Freedom ${result.max_dl_bw.slice(0, -6)}`,
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
  ];

  // Add warning section if dualCheck is true
  if (dualCheck) {
    blocks.splice(2, 0, {
      type: "section",
      text: {
        type: "plain_text",
        text: ":warning: WARNING: Sim card is in both HSS systems",
        emoji: true,
      },
    });
  }

  return {
    text: "fallback message",
    blocks: blocks,
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

module.exports = { defaultBlocks, deleteBlocks };
