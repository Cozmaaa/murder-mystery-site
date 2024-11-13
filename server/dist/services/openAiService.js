"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleOpenAiRequest = void 0;
const openai_1 = __importDefault(require("openai"));
require("dotenv").config();
const openai = new openai_1.default({
    apiKey: process.env.OpenAI_API_KEY,
});
const handleOpenAiRequest = (userId, suspectName, text, prompt, conversations) => __awaiter(void 0, void 0, void 0, function* () {
    const conversationKey = `${userId}-${suspectName}`;
    if (!conversations[conversationKey]) {
        conversations[conversationKey] = [{ role: "system", content: prompt }];
    }
    conversations[conversationKey].push({ role: "user", content: text });
    const stream = yield openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: conversations[conversationKey],
    });
    const responseContent = stream.choices[0].message.content;
    conversations[conversationKey].push({ role: "assistant", content: responseContent });
    return responseContent;
});
exports.handleOpenAiRequest = handleOpenAiRequest;
