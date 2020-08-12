"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
router.use((req, res, next) => {
    console.log(JSON.stringify({
        'Api': req.url,
        'Time': Date.now()
    }));
    next();
});
const api_1 = __importDefault(require("./api/api"));
router.use('/', api_1.default);
exports.default = router;
