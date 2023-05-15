const axios = require("axios");

const { errorBlocks } = require("@blocks/errorBlocks.js");

const errorController = (app) => {
  return async ({ error, logger, context, body }) => {
    logger.error(error);

    const errorChannel = "nocbot_error";

    try {
      if (body.channel_name !== errorChannel) {
        await axios.post(body.response_url, {
          replace_original: false,
          blocks: errorBlocks(body, error.message),
        });
      }

      await app.client.chat.postMessage({
        channel: errorChannel,
        text: "fallback text",
        blocks: errorBlocks(body, error.stack),
        token: context.botToken,
      });
    } catch (err) {
      logger.error(err);
    }
  };
};

module.exports = errorController;
