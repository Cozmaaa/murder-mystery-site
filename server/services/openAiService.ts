import OpenAI from "openai";
require("dotenv").config();

const openai = new OpenAI({
  apiKey: process.env.OpenAI_API_KEY,
});


interface Message{
  role:"system"|"user"|"assistant";
  content:string|null;
  name?:string;
}

interface Conversations{
  [key:string]:Message[];
}

const handleOpenAiRequest = async (userId:string, suspectName:string,text:string, prompt:string, conversations:Conversations) => {

    const conversationKey = `${userId}-${suspectName}`;
  if (!conversations[conversationKey]) {
    conversations[conversationKey] = [{ role: "system", content: prompt }];
  }

  conversations[conversationKey].push({ role: "user", content: text });

  const stream = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: conversations[conversationKey] as OpenAI.Chat.Completions.ChatCompletionMessageParam[],
  });

  const responseContent = stream.choices[0].message.content;
  conversations[conversationKey].push({ role: "assistant", content: responseContent });

  return responseContent;
};

export { handleOpenAiRequest };
