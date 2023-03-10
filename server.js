const express = require('express');
const http = require('http');
const path = require('path');
let app = express();
const port = process.env.PORT || '3000';

app.use(express.static(path.join(__dirname, 'build')));


app.set('port', port);
app.listen(port, () => console.log(`Running on localhost:${port}`));