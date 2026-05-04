const http = require('http');

const syntax = require('./syntax');
const logiaclerror = require('./logicalerror');


const server = http.createServer((req, res) => {
    console.log('Received request for:', req.url, req.method);
    syntax();
    logiaclerror();
});
const PORT = 8082;
server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});