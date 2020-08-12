"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUrls = void 0;
const axios_1 = __importDefault(require("axios"));
async function getUrls(urls) {
    const promises = [];
    urls.forEach(url => promises.push(axios_1.default.get(url)));
    return await Promise.all(promises);
}
exports.getUrls = getUrls;
