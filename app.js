const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const { read, readAll } = require('./routes/read');
const { create } = require('./routes/create');
const { update } = require('./routes/update');
const { remove } = require('./routes/delete');

const app = express();

mongoose
    .connect("mongodb://localhost:27017/Users", {
        useNewUrlParser: true,
        useCreateIndex: true
    })
    .then(() => console.log('DB Connected doc'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.post('/', create);
app.get('/:userId', read);
app.get('/', readAll);
app.put('/:userId', update);
app.delete('/', remove);

module.exports = app;