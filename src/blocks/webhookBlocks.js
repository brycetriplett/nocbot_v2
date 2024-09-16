const webhookBlocks = ({
  alertStatus,
  significantData,
  alertName,
  alertDescription,
  alertCreatedAt,
}) => {
  // Create fields dynamically from significantData
  const fields = Object.entries(significantData).map(([key, value]) => ({
    type: "plain_text",
    text: `${key}: ${value}`,
    emoji: true,
  }));

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
      fields: fields,
    },
    {
      type: "context",
      elements: [
        {
          type: "mrkdwn",
          text: `*Alert Status:* ${alertStatus}\n*Alert Description:* ${alertDescription}\n*Created At:* ${new Date(
            alertCreatedAt
          ).toLocaleString()}`,
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
