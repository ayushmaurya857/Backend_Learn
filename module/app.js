const http = require('http');
const fs = require('fs');

const requestHandler = require('./user1');

const server = http.createServer(requestHandler);
server.listen(8081, () => {
    console.log('Server is listening on port 8081');
});