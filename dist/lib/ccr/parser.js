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
exports.dumpFile = exports.filterProxy = exports.buildRuleGroups = exports.buildProxies = exports.parseProxyGroups = exports.parseProxies = void 0;
const yaml = require("js-yaml");
const Proxy = __importStar(require("./proxy"));
const Net = __importStar(require("./network"));
const rule_1 = require("./rule");
const utils_1 = require("./utils");
function parseProxies(proxies) {
    if (!utils_1.check(proxies))
        return [];
    const rst = proxies
        .map((item) => {
        let p;
        switch (item.type) {
            case 'vmess':
                p = new Proxy.Vmess(item);
                break;
            case 'ss':
                p = new Proxy.Shadowsocks(item);
                break;
            case 'socks5':
                p = new Proxy.Socks5(item);
                break;
            case 'http':
                p = new Proxy.Http(item);
                break;
            case 'trojan':
                p = new Proxy.Trojan(item);
                break;
            default:
                p = new Proxy.BaseProxy(item);
                break;
        }
        return p;
    });
    return rst;
}
exports.parseProxies = parseProxies;
function parseProxyGroups(proxyGroups) {
    const rst = proxyGroups
        .map((item) => {
        let p;
        switch (item.type) {
            case 'select':
                p = new Proxy.SelectProxyGroup(item);
                break;
            case 'urltest':
                p = new Proxy.UrlTestProxyGroup(item);
                break;
            case 'loadbalance':
                p = new Proxy.LoadBalanceProxyGroup(item);
                break;
            case 'relay':
                p = new Proxy.RelayProxyGroup(item);
                break;
            case 'fallback':
                p = new Proxy.FallbackProxyGroup(item);
                break;
            default:
                p = new Proxy.SelectProxyGroup(item);
                break;
        }
        return p;
    });
    return rst;
}
exports.parseProxyGroups = parseProxyGroups;
async function buildProxies(usr) {
    const rst = await Net.getUrls(usr.config.sub);
    usr.proxies = rst.map(item => item.data)
        .map(doc => yaml.safeLoad(doc))
        .map(obj => obj.proxies)
        .map(raw => parseProxies(raw))
        .reduce((all, cur) => all.concat(cur));
    usr.proxies = usr.proxies.concat(parseProxies(usr.config.proxy));
}
exports.buildProxies = buildProxies;
async function buildRuleGroups(usr) {
    usr.rules = await Promise.all(usr.config.rule.map(async (r) => {
        let payload = [];
        if (utils_1.check(r.url)) {
            const rst = await Net.getUrls(r.url);
            payload = rst.map(item => item.data)
                .map(doc => yaml.safeLoad(doc))
                .map(obj => obj.payload)
                .map(raw => raw.map((s) => new rule_1.Rule(s)))
                .reduce((all, cur) => all.concat(cur));
        }
        if (utils_1.check(r.extra)) {
            payload = payload.concat(r.extra.map((record) => new rule_1.Rule(record)));
        }
        return new rule_1.RuleGroup(r.name, r.prior, payload);
    }));
}
exports.buildRuleGroups = buildRuleGroups;
function filterProxy(keys, proxies) {
    let output = proxies;
    output = output.filter(proxy => keys.every(k => k.some(kk => proxy.name.includes(kk))));
    return output;
}
exports.filterProxy = filterProxy;
function dumpFile(usr) {
    let str = usr.header + '\n';
    str += yaml.safeDump(usr.doc);
    str = str.replace('proxyGroups', 'proxy-groups');
    return str;
}
exports.dumpFile = dumpFile;
