const fs = require('fs');

const requestHandler = (req, res) => {
    console.log(req.url, req.method);  
    
    if(req.url === '/'){
        res.statusCode = 200;   
        res.setHeader('Content-Type', 'text/html');
        res.write(
            `<html>
                <head>
                    <title>Calculator</title>
                </head>
                <body>
                    <h1>Hello from my Calculator World!</h1> 
                    <a href="/">Calculator</a> 
                </body>
            </html>`);
        return res.end();
    } else if(req.url === '/calculator'){
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.write(
            `<html>
                <head>
                    <title>Calculator</title>
                </head>
                <body>
                    <h1>Calculator</h1> 
                    <form method="POST" action="/calculate">
                        <input type="number" name="num1" placeholder="Enter first number"> 
                        <input type="number" name="num2" placeholder="Enter second number">
                        <button type="Sum">Calculate</button> 
                    </form> 
                </body>
            </html>`);
        return res.end();
    }else if(req.url === '/calculate-result' && req.method === 'POST'){
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.write(
            `<html>
                <head>
                    <title>Calculator</title>
                </head>
                <body>
                    <h1>Calculate Result</h1>
                </body>
            </html>`);
        return res.end();
    }

    else if (req.url.toLowerCase() === '/calculate' && req.method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        });

        req.on('end', () => {
            const completeBody = Buffer.concat(body).toString();
            const formData = new URLSearchParams(completeBody);
            const num1 = parseFloat(formData.get('num1'));
            const num2 = parseFloat(formData.get('num2'));
            const result = num1 + num2;
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            res.write(`<html><body><h1>Result: ${result}</h1></body></html>`);

            res.statusCode = 302; 
            res.setHeader('Location', '/calculate-result');
            return res.end();
        });
    } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/html');
        res.write('<html><body><h1>Page Not Found</h1></body></html>');
        return res.end();
    }
};

module.exports = {
    handler: requestHandler,    
};