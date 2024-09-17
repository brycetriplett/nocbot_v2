const webhookBlocks = ({
  alertStatus,
  significantData,
  alertName,
  alertDescription,
  alertCreatedAt,
  notes,
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
          text: `*Site*: ${significantData?.Site || "N/A"}`, // Ensure significantData exists
        },
        {
          type: "mrkdwn",
          text: `*Serial*: ${
            significantData?.["Device Serial Number"] || "N/A"
          }`, // Ensure significantData exists
        },
        {
          type: "mrkdwn",
          text: `*Sector*: ${significantData?.Sector || "N/A"}`, // Ensure significantData exists
        },
        {
          type: "mrkdwn",
          text: `*Notes*: ${notes || "No notes available"}`,
        },
      ],
    },
  ];
  console.log(`\n\n\n${blocks}\n\n\n`);
  return {
    text: "Fallback message",
    blocks: blocks,
  };
};

module.exports = { webhookBlocks };
