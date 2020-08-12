"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const connectDB = async function () {
    try {
        await mongoose_1.default.connect(process.env.SERVER_DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('DB connected!');
    }
    catch (err) {
        console.log('DB connection failed');
        process.exit(1);
    }
};
exports.default = connectDB;
