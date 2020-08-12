"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
let router = express.Router();
router.use((req, res, next) => {
    next();
});
router.get('/:uri', async function (req, res) {
    try {
    }
    catch (err) {
        console.log(err);
    }
});
module.exports = router;
