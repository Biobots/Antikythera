"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tRulePayload = exports.tSub = exports.tConfig = exports.tRuleConfig = exports.tOutputGroup = exports.tProxyGroup = exports.tProxies = exports.tProxy = void 0;
const t = __importStar(require("io-ts"));
exports.tProxy = t.type({
    name: t.string,
    server: t.string,
    port: t.number,
    type: t.string,
    uuid: t.union([t.string, t.undefined]),
    alterId: t.union([t.number, t.undefined]),
    cipher: t.union([t.string, t.undefined]),
    udp: t.union([t.boolean, t.undefined]),
    tls: t.union([t.boolean, t.undefined]),
    skipCertVerify: t.union([t.boolean, t.undefined]),
    network: t.union([t.string, t.undefined]),
    wsPath: t.union([t.string, t.undefined]),
    username: t.union([t.string, t.undefined]),
    password: t.union([t.string, t.undefined]),
    sni: t.union([t.string, t.undefined]),
});
exports.tProxies = t.array(exports.tProxy);
exports.tProxyGroup = t.type({
    name: t.string,
    type: t.string,
    keywords: t.union([t.array(t.string), t.null]),
    subgroup: t.union([t.array(t.string), t.undefined]),
    url: t.union([t.string, t.undefined]),
    interval: t.union([t.number, t.undefined]),
});
exports.tOutputGroup = t.type({
    name: t.string,
    type: t.string,
    proxies: t.array(t.string),
    url: t.union([t.string, t.undefined]),
    interval: t.union([t.number, t.undefined]),
});
exports.tRuleConfig = t.type({
    name: t.string,
    prior: t.number,
    url: t.union([t.array(t.string), t.undefined]),
    extra: t.union([t.array(t.string), t.undefined])
});
exports.tConfig = t.type({
    header: t.string,
    final: t.string,
    sub: t.array(t.string),
    rule: t.array(exports.tRuleConfig),
    proxy: t.union([t.array(t.string), t.undefined]),
    groups: t.array(exports.tProxyGroup)
});
exports.tSub = t.type({
    proxies: t.array(t.string),
});
exports.tRulePayload = t.type({
    payload: t.array(t.string)
});
