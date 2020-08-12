"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const joi_1 = __importDefault(require("joi"));
const crypto_1 = __importDefault(require("crypto"));
const model_1 = __importDefault(require("../../lib/urlshortener/model"));
const router = express_1.default.Router();
const urlSchema = joi_1.default.object().keys({
    url: joi_1.default.string().uri().required()
});
router.use((req, res, next) => {
    next();
});
router.get('/:code', async function (req, res) {
    try {
        const code = req.params.code;
        const url = await model_1.default.findOne({ code: code });
        if (url) {
            res.redirect(url.url);
        }
        else {
            res.status(404).json('Url not found');
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json('Server error');
    }
});
router.post('/', async function (req, res) {
    try {
        if (!(urlSchema.validate(req.body).error)) {
            const longurl = req.body;
            const url = await model_1.default.findOne(longurl);
            if (url) {
                res.json({ code: url.code });
            }
            else {
                let code = '';
                do {
                    code = crypto_1.default.randomBytes(9).toString('base64').replace(/\//g, '_').replace(/\+/g, '-');
                } while (await model_1.default.findOne({ code: code }));
                await new model_1.default({
                    code: code,
                    url: longurl.url
                }).save();
                res.json({ code: code });
            }
        }
        else {
            res.status(406).json('Url validation failed');
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json('Server error');
    }
});
exports.default = router;
