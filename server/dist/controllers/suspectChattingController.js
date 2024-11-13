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
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateResponse = void 0;
const openAiService_1 = require("../services/openAiService");
const conversations = {};
const generateResponse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, suspectName, text, prompt } = req.body;
    try {
        const responseContent = yield (0, openAiService_1.handleOpenAiRequest)(userId, suspectName, text, prompt, conversations);
        res.json({ response: responseContent });
    }
    catch (error) {
        res.status(500).send("Error while generating response");
    }
});
exports.generateResponse = generateResponse;
