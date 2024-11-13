"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userNoteSchema = new mongoose_1.Schema({
    userId: { type: String, required: true },
    caseLevel: { type: Number, required: true },
    content: { type: String, required: false },
});
const UserNote = (0, mongoose_1.model)('UserNote', userNoteSchema);
exports.default = UserNote;
