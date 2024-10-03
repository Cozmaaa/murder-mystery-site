const OpenAI = require("openai");
require("dotenv").config();

const openai = new OpenAI({
  apiKey: process.env.OpenAI_API_KEY,
});


const handleOpenAiRequest = async (userId, suspectName,text, prompt, conversations) => {

    const conversationKey = `${userId}-${suspectName}`;
  if (!conversations[conversationKey]) {
    conversations[conversationKey] = [{ role: "system", content: prompt }];
  }

  conversations[conversationKey].push({ role: "user", content: text });

  const stream = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: conversations[conversationKey],
  });

  const responseContent = stream.choices[0].message.content;
  conversations[conversationKey].push({ role: "assistant", content: responseContent });

  return responseContent;
};

module.exports = { handleOpenAiRequest };
