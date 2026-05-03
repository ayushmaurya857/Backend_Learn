const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    console.log('Received request for:', req);
});

server.listen(8081, () => {
    console.log('Server is listening on port 8081');
});