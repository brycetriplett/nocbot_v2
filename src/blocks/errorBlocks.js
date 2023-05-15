const errorBlocks = (body, errorMessage) => {
  return [
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
          text: `${body.command} ${body.text}`,
          emoji: true,
        },
      ],
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: errorMessage,
      },
    },
    {
      type: "context",
      elements: [
        {
          type: "mrkdwn",
          text: `Command executed by ${body.user_name}`,
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
  ];
};

module.exports = { errorBlocks };
