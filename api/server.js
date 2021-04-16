'use strict';

const bodyParser = require('body-parser');
const express = require('express');

const root = require('./routes/root');
const paragraph = require('./routes/paragraph');

const PORT = 8080;
const HOST = '0.0.0.0';

const paragraphs = {};

const app = express();
app.use(bodyParser.json());

app.use('/', root);
app.use('/paragraph', paragraph);

app.listen(PORT, HOST, () => {
    console.log(`Server running on http://${HOST}:${PORT}`);
});
