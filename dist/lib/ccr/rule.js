"use strict";
//enum PayloadType {
//	Normal,
//	NoResolve,
//}
Object.defineProperty(exports, "__esModule", { value: true });
exports.RuleGroup = exports.Rule = void 0;
class Rule {
    constructor(raw) {
        const str = raw.split(',');
        if (str.length > 2) {
            this.prefix = str[0] + ',' + str[1];
            this.suffix = str[2];
            this.raw = raw;
        }
        else if (str.length < 2) {
            this.prefix = 'IP-CIDR,' + str[0];
            this.raw = raw;
            this.suffix = '';
        }
        else {
            this.prefix = raw;
            this.suffix = '';
            this.raw = raw;
        }
    }
    getRaw(strategy) {
        if (this.suffix === '')
            return this.prefix + ',' + strategy;
        else
            return this.prefix + ',' + strategy + ',' + this.suffix;
    }
}
exports.Rule = Rule;
class RuleGroup {
    constructor(name, prior, payload) {
        this.name = name;
        this.prior = prior;
        this.payload = payload;
    }
    getRaw() {
        return this.payload.map(p => p.getRaw(this.name));
    }
}
exports.RuleGroup = RuleGroup;
