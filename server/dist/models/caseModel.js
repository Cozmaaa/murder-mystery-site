"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const caseSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    imageName: {
        type: String,
        required: true
    },
    level: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true,
    }
});
const CaseModel = (0, mongoose_1.model)('Case', caseSchema);
exports.default = CaseModel;
