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

    if(req.url === '/favicon.ico'){ 
        res.statusCode = 204; //
        return res.end(); 
    } else if(req.url === '/hello'){ // req.url gives us the path of the request, so we can check if it's /hello and respond accordingly
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.write('Hello, World!');
        return res.end(); //after sending the response, we end the response to free up resources
    }
    else if(req.url === '/'){
        res.statusCode = 200;   
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>My First Node Server</title></head>');
        res.write('<body><h1>Welcome to my Home Page</h1></body>');
        res.write('</html>');
        return res.end(); //after sending the response, we end the response to free up resources
    }
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My First Node Server</title></head>');
    res.write('<body><h1>Hello from my first Node Server!</h1></body>');
    res.write('</html>');
    res.end(); //no need to return here because it's the last statement in the function, but it's good practice to end the response to free up resources
    // process.exit();
})
server.listen(8081, () => {
    console.log('Server is listening on port 8081');
});



