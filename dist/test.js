"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
require('dotenv').config();
const testschema = new mongoose.Schema({
    user: String,
    id: Number
});
const Test = mongoose.model('model', testschema, 'test');
mongoose.connect(process.env.TEST_DB_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    let q = Test.find({ 'user': 'config2' });
    q.select('user id');
    q.exec().then(val => console.log(val));
});
mongoose.connection.on('connected', () => console.log('done'));
