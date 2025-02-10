const speedTestBlocks = ({ command, result, header }) => {
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
            text: `${command.command} ${command.text}`,
            emoji: true,
          },
        ],
      },
      {
        type: "section",
        fields: [
          {
            type: "plain_text",
            text: `Serial: ${result.data.serialNumber}`,
            emoji: true,
          },
          {
            type: "plain_text",
            text: `Status: ${result.data.diagnosticOperationStatus}`,
            emoji: true,
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

const viewBlocks = ({ command, result, header }) => {
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
            text: `Serial: ${result.data.serialNumber}`,
            emoji: true,
          },
          {
            type: "plain_text",
            text: `Site: ${result.data.hierarchy.site}`,
            emoji: true,
          },
          {
            type: "plain_text",
            text: `Sector: ${result.data.hierarchy.sector}`,
            emoji: true,
          },
          {
            type: "plain_text",
            text: `SLA: ${result.data.slaProfile}`,
            emoji: true,
          },
          {
            type: "plain_text",
            text: `Notes: ${result.data.notes}`,
            emoji: true,
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

module.exports = { speedTestBlocks, viewBlocks };
