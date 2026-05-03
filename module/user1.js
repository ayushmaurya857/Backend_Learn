const http = require('http');
const fs = require('fs');

const requestHandler = (req, res) => {
    // console.log(req);
    console.log(req.url, req.method);
    
    

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
    }
    
    else if(req.url.toLocaleLowerCase() === '/submit'  && req.method === 'POST' ){

        //--------------CHUNK AND BUFFER AND PARSING --------------------------------------------
        const body = [];

        req.on('data', (chunk) => {
            console.log('Received chunk:', chunk.toString());
            // You can also accumulate the chunks if you expect more data
            body.push(chunk);
        });

        req.on('end', () => {
            const completeBody = Buffer.concat(body).toString();
            console.log('Complete body:', completeBody);
            
            const formData = new URLSearchParams(completeBody);
            // for (const [key, value] of formData.entries()) {
            //     console.log(`${key}: ${value}`);
            // }
            const bodyObject = Object.fromEntries(formData);

            fs.writeFile('user.txt', JSON.stringify(bodyObject), (err) => {
            if (err) {
                console.error('Error writing to file:', err);
            } //writeFile is asynchronous, so we handle the callback to check for errors and log them if they occur. If the file is written successfully, we can proceed with sending the response to the client.
            res.statusCode = 302; 
            res.setHeader('Location', '/');
            return res.end();
        });
        //----------------------------------------------------------------------------

        
            // res.statusCode = 302; 
            // res.setHeader('Location', '/');
            // return res.end();
            //this code should be inside the callback of fs.writeFile to ensure that we only redirect after the file has been written successfully. Otherwise, we might end up redirecting before the file is written, which could lead to unexpected behavior. So we move the redirection code inside the callback of fs.writeFile like this.. if we put it outside, it will execute immediately after calling fs.writeFile, without waiting for the file writing to complete. This means that the client would be redirected before the server has finished processing the form data and writing it to the file, which could lead to issues such as the file not being written correctly or the client not receiving the expected response. By placing the redirection code inside the callback of fs.writeFile, we ensure that the redirection only occurs after the file has been successfully written, providing a more reliable and predictable user experience.
        });
        return; //after handling the form submission, we return to prevent further processing of the request
        //or make next default code in else block and return here to prevent further processing of the request
        
    }
    res.setHeader('Content-Type', 'text/html'); //default content type is text/html, so we set it here for all other routes and you can also set as 404 for we can't handel your request 
    res.write('<html>');
    res.write('<head><title>My First Node Server</title></head>');
    res.write('<body><h1>Hello from my first Node Server!</h1></body>');
    res.write('</html>');
    res.end(); //no need to return here because it's the last statement in the function, but it's good practice to end the response to free up resources
    // process.exit();
};

// module.exports = requestHandler;
module.exports = {
    handler: requestHandler,
    

};




