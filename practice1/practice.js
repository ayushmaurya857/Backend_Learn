const http = require('http');  
const fs = require('fs');

const server = http.createServer((req, res) => {
    console.log(req.url, req.method);

    res.setHeader('Content-Type', 'text/html');

    if(req.url === '/home'){
        res.write('<h1>Welcome to Myntra Home Page</h1>');
        return res.end();
    }   else if(req.url === '/men'){
        res.write('<h1>Welcome to Myntra Men Page</h1>');
        return res.end();
    }   else if(req.url === '/women'){
        res.write('<h1>Welcome to Myntra Women Page</h1>');
        return res.end();
    }   else if(req.url === '/kids'){
        res.write('<h1>Welcome to Myntra Kids Page</h1>');
        return res.end();
    }   else if(req.url === '/cart'){
        res.write('<h1>Welcome to Myntra Cart Page</h1>');
        return res.end();
    }


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
    return res.end();




});

 

server.listen(8081, () => { 
    console.log('Server is listning on port 8081');
})