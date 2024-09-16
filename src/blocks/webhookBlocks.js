const webhookBlocks = ({
  alertStatus,
  significantData,
  alertName,
  alertDescription,
  alertCreatedAt,
}) => {
  const blocks = [
    {
      type: "header",
      text: {
        type: "plain_text",
        text: `Alert: ${alertName}`,
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
          type: "mrkdwn",
          text: `*Alert Status*: ${alertStatus}`,
        },
        {
          type: "mrkdwn",
          text: `*Site*: ${significantData.Site}`,
        },
        {
          type: "mrkdwn",
          text: `*Serial*: ${significantData["Device Serial Number"]}`,
        },
        {
          type: "mrkdwn",
          text: `*Sector*: ${significantData.Sector}`,
        },
      ],
    },
  ];

  return {
    text: "fallback message",
    blocks: blocks,
  };
};

module.exports = { webhookBlocks };
