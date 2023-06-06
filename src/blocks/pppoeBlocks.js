const noLoginBlocks = ({ command, header }) => {
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
        text: {
          type: "plain_text",
          text: `There is no current login for the username ${command.username}`,
          emoji: true,
        },
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

const viewBlocks = ({ command, result, header }) => {
  console.log(result);
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
            text: `username: ${result.result[0]["username"]}`,
            emoji: true,
          },
          {
            type: "plain_text",
            text: `IP Address: ${result.result[0]["ipv4"]}`,
            emoji: true,
          },
          {
            type: "plain_text",
            text: `Login Count: ${result.count}`,
            emoji: true,
          },
          {
            type: "plain_text",
            text: `Time Online: ${result.result[0]["onlineTime"]} Seconds`,
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
};

const kickBlocks = ({ command, header }) => {
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
            text: `Username: ${command.username}`,
            emoji: true,
          },
          {
            type: "plain_text",
            text: `Result: Success`,
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

module.exports = {
  noLoginBlocks,
  viewBlocks,
  kickBlocks,
};
