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
exports.getUser = exports.User = void 0;
const yaml = require("js-yaml");
const fs = require("fs");
const path = require("path");
const Parser = __importStar(require("./parser"));
const Type = __importStar(require("./types"));
const Either_1 = require("fp-ts/lib/Either");
class User {
    constructor(id) {
        this.header = '';
        this.proxies = [];
        this.rules = [];
        this.groups = [];
        this.doc = {
            proxies: [],
            proxyGroups: [],
            rules: []
        };
        try {
            const c = Type.tConfig.decode(yaml.safeLoad(fs.readFileSync(path.join(process.env.CCR_DIR, id + '.yml'), 'utf-8')));
            if (Either_1.isRight(c))
                this.config = c.right;
            else {
                console.log(c.left);
                process.exit(1);
            }
            this.header = fs.readFileSync(path.join(process.env.CCR_DIR, this.config.header), 'utf-8');
        }
        catch (error) {
            console.log(error);
            process.exit(1);
        }
    }
    buildProxyGroups() {
        this.groups = Parser.parseProxyGroups(this.config.groups);
        this.groups.forEach(g => {
            if (g.keywords != null) {
                const keywords = g.keywords.map(k => k.split(' '));
                g.proxies = Parser.filterProxy(keywords, this.proxies);
            }
        });
    }
    generateDoc() {
        this.generateProxies();
        this.generateRules();
        this.generateGroups();
    }
    generateProxies() {
        this.proxies.forEach(item => {
            this.doc.proxies.push(JSON.parse(JSON.stringify(item)));
        });
    }
    generateRules() {
        this.rules.sort((a, b) => a.prior - b.prior)
            .map(r => r.getRaw())
            .forEach(s => s.forEach(ss => this.doc.rules.push(ss)));
        this.doc.rules.push('MATCH,' + this.config.final);
    }
    generateGroups() {
        this.groups.forEach(item => {
            this.doc.proxyGroups.push(JSON.parse(JSON.stringify(item.getRaw())));
        });
    }
}
exports.User = User;
async function getUser(id) {
    const usr = new User(id);
    await Parser.buildProxies(usr);
    await Parser.buildRuleGroups(usr);
    usr.buildProxyGroups();
    return usr;
}
exports.getUser = getUser;
