const http = require('http');

// function requestListener(req, res){
//     console.log('Request received');
// }
// const server = http.createServer(requestListener);

// server.listen(8080, () => {
//     console.log('Server is listening on port 8080');
// });

const server = http.createServer((req, res)=>{
    // console.log(req);
    console.log(req.url, req.method, req.headers);
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My First Node Server</title></head>');
    res.write('<body><h1>Hello from my first Node Server!</h1></body>');
    res.write('</html>');
    res.end();
})
server.listen(8081, () => {
    console.log('Server is listening on port 8081');
});

