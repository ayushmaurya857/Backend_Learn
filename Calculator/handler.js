const requesthandler = (req, res) => {
    console.log('Request received');
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
                    <h1>Welcome to the Calculator World!</h1>
                    <a href="/calculator">Go to Calculator</a>
                </body>
            </html>`);
        return res.end();
    }  
    else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/html');
        res.write('<html><body><h1>Page Not Found</h1><a href="/">Go back to Home</a></body></html>');
        return res.end();
    }

}

module.exports = {
    handler: requesthandler
};