import { Request, Response } from "express";
import { handleOpenAiRequest } from "../services/openAiService";

interface IResponse {
  userId: string;
  suspectName: string;
  text: string;
  prompt: string;
}

const conversations: { [key: string]: any } = {};

const generateResponse = async (req: Request, res: Response): Promise<void> => {
  const { userId, suspectName, text, prompt } = req.body as IResponse;

  try {
    const responseContent = await handleOpenAiRequest(
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

export { generateResponse };