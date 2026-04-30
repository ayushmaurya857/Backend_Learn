const http = require('http');  
const fs = require('fs');

const server = http.createServer((req, res) => {
    console.log(req.url, req.method);

    res.setHeader('Content-Type', 'text/html');
    res.write(`
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Myntra</title>
        </head>
        <body>
                <nav>
                    <ul>
                        <li><a href="/home">Home</a></li> 
                        <li><a href="/men">Men</a></li> 
                        <li><a href="/women">Women</a></li> 
                        <li><a href="/kids">Kids</a></li> 
                        <li><a href="/cart">Cart</a></li> 
                    </ul>
                </nav>
        </body>
        </html>
    `);
    res.end();




});

 

server.listen(8081, () => { 
    console.log('Server is listning on port 8081');
})