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
          text: `*Operator*: ${significantData.Operator}`,
        },
        {
          type: "mrkdwn",
          text: `*Site*: ${significantData.Site}`,
        },
        {
          type: "mrkdwn",
          text: `*Hostname*: ${significantData["Device Hostname"]}`,
        },
        {
          type: "mrkdwn",
          text: `*Serial*: ${significantData["Device Serial Number"]}`,
        },
        {
          type: "mrkdwn",
          text: `*Sector*: ${significantData.Sector}`,
        },
        {
          type: "mrkdwn",
          text: `*Device Reported Reason*: ${significantData["Device Reported Reason"]}`,
        },
        {
          type: "mrkdwn",
          text: `*Disconnect Reason*: ${significantData["Disconnect Reason"]}`,
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
