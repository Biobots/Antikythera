"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const user_1 = require("../../lib/ccr/user");
const parser_1 = require("../../lib/ccr/parser");
const router = express.Router();
router.use((req, res, next) => {
    next();
});
router.get('/:id', async function (req, res) {
    try {
        const id = req.params.id;
        const user = await user_1.getUser(id);
        user.generateDoc();
        res.writeHead(200, { 'Content-type': 'text/yaml', 'Content-Disposition': 'attachment; filename=out.yml' }).write(parser_1.dumpFile(user));
        res.end();
    }
    catch (err) {
        console.log(err);
        res.status(500).write(err);
        res.end();
    }
});
exports.default = router;
