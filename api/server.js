'use strict';

const bodyParser = require('body-parser');
const express = require('express');

const PORT = 8080;
const HOST = '0.0.0.0';

const paragraphs = {};

const app = express();
app.use(bodyParser.json());
app.get('/', (req, res) => {
  res.send('Hello world\n');
});

app.listen(PORT, HOST, () => {
    console.log(`Server running on http://${HOST}:${PORT}`);
});
