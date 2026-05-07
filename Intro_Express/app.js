//core module
// const require = require('require');
const http = require('http');
const fs = require('fs');

//external module
const express = require('express');

const requestHandler =  require('./handler');

const app = express();

app.use((req, res, next) => {
    console.log("Came in first middleware", req.url, req.method);
    next();
});

const server = http.createServer(app);

server.listen(8081, () => {
    console.log('Server is listening on port 8081');
});