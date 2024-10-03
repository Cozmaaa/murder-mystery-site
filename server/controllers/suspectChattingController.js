const openAiService = require("../services/openAiService");

const conversations = {};

const generateResponse = async (req, res) => {
  const { userId,suspectName, text, prompt } = req.body;

  try {
    const responseContent = await openAiService.handleOpenAiRequest(
      userId,
      suspectName,
      text,
      prompt,
      conversations
    );
    res.json({ response: responseContent });
  } catch (error) {
    res.status(500).send("Error while generating response");
  }
};

module.exports = { generateResponse };
