"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Trojan = exports.Http = exports.Socks5 = exports.Shadowsocks = exports.Vmess = exports.BaseProxy = exports.RelayProxyGroup = exports.FallbackProxyGroup = exports.LoadBalanceProxyGroup = exports.UrlTestProxyGroup = exports.SelectProxyGroup = exports.BaseProxyGroup = exports.ProxyGroupType = exports.ProxyType = void 0;
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
class BaseProxyGroup {
    constructor(raw) {
        this.subgroup = [];
        this.raw = raw;
        this.name = raw.name;
        this.keywords = raw.keywords;
        this.type = ProxyGroupType.Base;
        this.proxies = [];
        if (typeof (raw.subgroup) != 'undefined')
            this.subgroup = raw.subgroup;
    }
}
exports.BaseProxyGroup = BaseProxyGroup;
class SelectProxyGroup extends BaseProxyGroup {
    constructor(raw) {
        super(raw);
        this.type = ProxyGroupType.Select;
    }
    getRaw() {
        return {
            name: this.name,
            type: 'select',
            proxies: this.subgroup.concat(this.proxies.map(p => p.name))
        };
    }
}
exports.SelectProxyGroup = SelectProxyGroup;
class UrlTestProxyGroup extends BaseProxyGroup {
    constructor(raw) {
        super(raw);
        this.type = ProxyGroupType.UrlTest;
        this.url = raw.url;
        this.interval = raw.interval;
    }
    getRaw() {
        return {
            name: this.name,
            type: 'url-test',
            url: this.url,
            interval: this.interval,
            proxies: this.subgroup.concat(this.proxies.map(p => p.name))
        };
    }
}
exports.UrlTestProxyGroup = UrlTestProxyGroup;
class LoadBalanceProxyGroup extends BaseProxyGroup {
    constructor(raw) {
        super(raw);
        this.type = ProxyGroupType.LoadBalance;
        this.url = raw.url;
        this.interval = raw.interval;
    }
    getRaw() {
        return {
            name: this.name,
            type: 'load-balance',
            url: this.url,
            interval: this.interval,
            proxies: this.subgroup.concat(this.proxies.map(p => p.name))
        };
    }
}
exports.LoadBalanceProxyGroup = LoadBalanceProxyGroup;
class FallbackProxyGroup extends BaseProxyGroup {
    constructor(raw) {
        super(raw);
        this.type = ProxyGroupType.Fallback;
        this.url = raw.url;
        this.interval = raw.interval;
    }
    getRaw() {
        return {
            name: this.name,
            type: 'fallback',
            url: this.url,
            interval: this.interval,
            proxies: this.subgroup.concat(this.proxies.map(p => p.name))
        };
    }
}
exports.FallbackProxyGroup = FallbackProxyGroup;
class RelayProxyGroup extends BaseProxyGroup {
    constructor(raw) {
        super(raw);
        this.type = ProxyGroupType.Relay;
    }
    getRaw() {
        return {
            name: this.name,
            type: 'relay',
            proxies: this.subgroup.concat(this.proxies.map(p => p.name))
        };
    }
}
exports.RelayProxyGroup = RelayProxyGroup;
class BaseProxy {
    constructor(raw) {
        this.name = raw.name;
        this.raw = raw;
        this.type = ProxyType.Base;
    }
}
exports.BaseProxy = BaseProxy;
class Vmess extends BaseProxy {
    constructor(raw) {
        super(raw);
        this.server = '';
        this.port = 0;
        this.uuid = '';
        this.alterId = 0;
        this.cipher = '';
        this.udp = undefined;
        this.tls = undefined;
        this.skipCertVerify = undefined;
        this.network = undefined;
        this.wsPath = undefined;
        this.type = ProxyType.Vmess;
        this.server = raw.server;
        this.port = raw.port;
        this.uuid = raw.uuid;
        this.alterId = raw.alterId;
        this.cipher = raw.cipher;
        this.udp = raw.udp;
        this.tls = raw.tls;
        this.skipCertVerify = raw.skipCertVerify;
        this.network = raw.network;
        this.wsPath = raw.wsPath;
    }
}
exports.Vmess = Vmess;
class Shadowsocks extends BaseProxy {
    constructor(raw) {
        super(raw);
        this.server = '';
        this.port = 0;
        this.password = '';
        this.cipher = '';
        this.udp = undefined;
        this.type = ProxyType.Shadowsocks;
        this.server = raw.server;
        this.port = raw.port;
        this.password = raw.password;
        this.cipher = raw.cipher;
        this.udp = raw.udp;
    }
}
exports.Shadowsocks = Shadowsocks;
class Socks5 extends BaseProxy {
    constructor(raw) {
        super(raw);
        this.server = '';
        this.port = 0;
        this.username = undefined;
        this.password = undefined;
        this.tls = undefined;
        this.skipCertVerify = undefined;
        this.udp = undefined;
        this.type = ProxyType.Socks5;
        this.server = raw.server;
        this.port = raw.port;
        this.username = raw.username;
        this.password = raw.password;
        this.tls = raw.tls;
        this.skipCertVerify = raw.skipCertVerify;
        this.udp = raw.udp;
    }
}
exports.Socks5 = Socks5;
class Http extends BaseProxy {
    constructor(raw) {
        super(raw);
        this.server = '';
        this.port = 0;
        this.username = undefined;
        this.password = undefined;
        this.tls = undefined;
        this.skipCertVerify = undefined;
        this.udp = undefined;
        this.type = ProxyType.Http;
        this.server = raw.server;
        this.port = raw.port;
        this.username = raw.username;
        this.password = raw.password;
        this.tls = raw.tls;
        this.skipCertVerify = raw.skipCertVerify;
        this.udp = raw.udp;
    }
}
exports.Http = Http;
class Trojan extends BaseProxy {
    constructor(raw) {
        super(raw);
        this.server = '';
        this.port = 0;
        this.password = '';
        this.sni = undefined;
        this.skipCertVerify = undefined;
        this.udp = undefined;
        this.type = ProxyType.Trojan;
        this.server = raw.server;
        this.port = raw.port;
        this.password = raw.password;
        this.sni = raw.sni;
        this.skipCertVerify = raw.skipCertVerify;
        this.udp = raw.udp;
    }
}
exports.Trojan = Trojan;
