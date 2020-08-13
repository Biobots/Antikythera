"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProxyGroup = exports.ProxyGroupType = exports.ProxyType = void 0;
var ProxyType;
(function (ProxyType) {
    ProxyType[ProxyType["Base"] = 0] = "Base";
    ProxyType[ProxyType["Vmess"] = 1] = "Vmess";
    ProxyType[ProxyType["Shadowsocks"] = 2] = "Shadowsocks";
    ProxyType[ProxyType["Socks5"] = 3] = "Socks5";
    ProxyType[ProxyType["Http"] = 4] = "Http";
    ProxyType[ProxyType["Snell"] = 5] = "Snell";
    ProxyType[ProxyType["Trojan"] = 6] = "Trojan";
    ProxyType[ProxyType["ShadowsocksR"] = 7] = "ShadowsocksR";
})(ProxyType = exports.ProxyType || (exports.ProxyType = {}));
var ProxyGroupType;
(function (ProxyGroupType) {
    ProxyGroupType[ProxyGroupType["Base"] = 0] = "Base";
    ProxyGroupType[ProxyGroupType["Select"] = 1] = "Select";
    ProxyGroupType[ProxyGroupType["UrlTest"] = 2] = "UrlTest";
    ProxyGroupType[ProxyGroupType["Fallback"] = 3] = "Fallback";
    ProxyGroupType[ProxyGroupType["LoadBalance"] = 4] = "LoadBalance";
    ProxyGroupType[ProxyGroupType["Relay"] = 5] = "Relay";
})(ProxyGroupType = exports.ProxyGroupType || (exports.ProxyGroupType = {}));
class ProxyGroup {
    constructor(raw) {
        this.subgroup = [];
        this.name = raw.name;
        this.keywords = raw.keywords;
        this.type = raw.type;
        this.proxies = [];
        this.url = raw.url;
        this.interval = raw.interval;
        if (typeof (raw.subgroup) != 'undefined')
            this.subgroup = raw.subgroup;
    }
    getRaw() {
        return {
            name: this.name,
            type: this.type,
            url: this.url,
            interval: this.interval,
            proxies: this.subgroup.concat(this.proxies.map(p => p.name))
        };
    }
}
exports.ProxyGroup = ProxyGroup;
