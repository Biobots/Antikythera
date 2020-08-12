"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
const ccr_1 = __importDefault(require("./ccr"));
const urlshortener_1 = __importDefault(require("./urlshortener"));
router.use((req, res, next) => {
    next();
});
router.use('/ccr', ccr_1.default);
router.use('/url', urlshortener_1.default);
exports.default = router;
