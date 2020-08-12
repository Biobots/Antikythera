"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Config = void 0;
var yaml = require("js-yaml");
var fs = require("fs");
var Config = /** @class */ (function () {
    function Config() {
    }
    Config.load = function () {
        try {
            var config = yaml.safeLoad(fs.readFileSync('global.yml', 'utf-8'));
            this.port = config.port;
            this.configDir = config.configDir;
            this.outputDir = config.outputDir;
        }
        catch (error) {
            console.log(error);
            process.exit(1);
        }
    };
    return Config;
}());
exports.Config = Config;
