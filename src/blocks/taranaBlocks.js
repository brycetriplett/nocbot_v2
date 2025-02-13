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
            text: `${command.command} ${command.text}`,
            emoji: true,
          },
        ],
      },
      {
        type: "section",
        fields: [
          {
            type: "mrkdwn",
            text: `*Serial*: ${result.data.serialNumber}`,
            emoji: true,
          },
          {
            type: "mrkdwn",
            text: `*Site*: ${result.data.hierarchy.site.name}`,
            emoji: true,
          },
          {
            type: "mrkdwn",
            text: `*Sector*: ${result.data.hierarchy.sector.name}`,
            emoji: true,
          },
          {
            type: "mrkdwn",
            text: `*SLA*: ${result.data.slaProfile}`,
            emoji: true,
          },
          {
            type: "mrkdwn",
            text: `*Notes*: ${result.data.notes}`,
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

const slaListBlocks = ({ command, result, header }) => {
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
            text: result,
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

module.exports = { speedTestBlocks, viewBlocks, slaListBlocks };
