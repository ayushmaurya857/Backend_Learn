const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res)=>{
    // console.log(req);
    console.log(req.url, req.method, req.headers);

    if(req.url === '/hello'){ // req.url gives us the path of the request, so we can check if it's /hello and respond accordingly
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
        res.write('<body><h1>Welcome to my Home Page and Enter Your Details</h1>');
        res.write('<form action="/submit" method="POST">');
        res.write('<label for="name">Name:</label>');
        res.write('<input type="text" id="name" name="name" placeholder="Enter your name"><br><br>');
        res.write('<label for="email">Email:</label>');
        res.write('<input type="email" id="email" name="email" placeholder="Enter your email"><br><br>');
        res.write('<input type="submit" value="Submit">');
        res.write('</form>');
        res.write('</body>');
        res.write('</html>');
        return res.end(); //after sending the response, we end the response to free up resources
    }else if(req.url.toLocaleLowerCase() === '/submit'  && req.method === 'POST' ){
        fs.writeFile('user.txt', 'User submitted the form', (err) => {
            if (err) {
                console.error('Error writing to file:', err);
            }
            res.statusCode = 302; 
            res.setHeader('Location', '/');
            return res.end()

        });
        return; //after handling the form submission, we return to prevent further processing of the request
        
    }
    res.setHeader('Content-Type', 'text/html'); //default content type is text/html, so we set it here for all other routes and you can also set as 404 for we can't handel your request 
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



