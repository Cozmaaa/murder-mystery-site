"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const documentSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    imageName: {
        type: String,
        required: true,
    },
    level: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: false,
    }
});
// Create the Document model
const DocumentModel = (0, mongoose_1.model)('Document', documentSchema);
exports.default = DocumentModel;
