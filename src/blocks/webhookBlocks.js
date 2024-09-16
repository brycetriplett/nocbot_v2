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
          type: "plain_text",
          text: `Operator: ${significantData.Operator}`,
          emoji: true,
        },
        {
          type: "plain_text",
          text: `Site: ${significantData.Site}`,
          emoji: true,
        },
        {
          type: "plain_text",
          text: `Device Hostname: ${significantData["Device Hostname"]}`,
          emoji: true,
        },
        {
          type: "plain_text",
          text: `Device Serial Number: ${significantData["Device Serial Number"]}`,
          emoji: true,
        },
        {
          type: "plain_text",
          text: `Sector: ${significantData.Sector}`,
          emoji: true,
        },
        {
          type: "plain_text",
          text: `Device Type: ${significantData["Device Type"]}`,
          emoji: true,
        },
        {
          type: "plain_text",
          text: `Device Reported Reason: ${significantData["Device Reported Reason"]}`,
          emoji: true,
        },
        {
          type: "plain_text",
          text: `Disconnect Reason: ${significantData["Disconnect Reason"]}`,
          emoji: true,
        },
      ],
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
