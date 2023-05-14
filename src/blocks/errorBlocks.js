function errorBlocks(command, error) {
  return {
    text: "fallback message",
    blocks: [
      {
        type: "header",
        text: {
          type: "plain_text",
          text: ":bangbang: Error :bangbang:",
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
          {
            type: "plain_text",
            text: error.message,
            emoji: true,
          },
        ],
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
}

module.exports = errorBlocks;
