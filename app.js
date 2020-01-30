const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

require('dotenv').config();

const { read, readAll , ReadByEmailAndPassword} = require('./routes/read');
const { create } = require('./routes/create');
const { update } = require('./routes/update');
const { remove } = require('./routes/delete');

const app = express();

mongoose
    .connect(process.env.DATABASE, {
        useNewUrlParser: true,
        useCreateIndex: true
    })
    .then(() => console.log('DB Connected doc'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.post('/', create);
app.get('/', readAll);
app.post('/ReadByEmailAndPassword', ReadByEmailAndPassword);
app.get('/:userId', read);
app.put('/:userId', update);
app.delete('/:userId', remove);

module.exports = app;