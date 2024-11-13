"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const suspectSchema = new mongoose_1.Schema({
    name: {
        type: String,
        require: true,
    },
    faceImage: {
        type: String,
        required: true,
    },
    level: {
        type: Number,
        required: true,
    },
    isGuilty: {
        type: Boolean,
        required: true,
    },
    prompt: {
        type: String,
        required: true,
    }
});
const Suspect = (0, mongoose_1.model)('Suspect', suspectSchema);
exports.default = Suspect;
