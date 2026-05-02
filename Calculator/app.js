// const require = require('require');
const http = require('http');
const fs = require('fs');

const requestHandler =  require('./handler');
const server = http.createServer(requestHandler.handler);

server.listen(8081, () => {
    console.log('Server is listening on port 8081');
});