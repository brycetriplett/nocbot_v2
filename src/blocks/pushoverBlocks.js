const defaultBlocks = ({ command, result, header }) => {
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
        text: {
          type: "mrkdwn",
          text: result,
        },
      },
      {
        type: "context",
        elements: [
          {
            type: "mrkdwn",
            text: `Command executed by ${command.user_name}`,
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

module.exports = { defaultBlocks };
