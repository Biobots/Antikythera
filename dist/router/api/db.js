"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
let router = express.Router();
router.use((req, res, next) => {
    next();
});
router.get('/:id', async function (req, res, next) {
});
module.exports = router;
