const { executefunction } = require("./execute");


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
    
    else if(req.url.toLowerCase() === '/calculator'){
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.write(
            `<html>
                <head>
                    <title>Calculator</title>
                </head>
                <body>
                    <h1>Calculator</h1>
                    <form action="/calculate-result" method="post">
                        <input type="number" name="num1" placeholder="Enter first number" required>
                        <select name="operation">
                            <option value="add">Add</option>
                            <option value="subtract">Subtract</option>
                            <option value="multiply">Multiply</option>
                            <option value="divide">Divide</option>
                        </select>
                        <input type="number" name="num2" placeholder="Enter second number" required>
                        <button type="submit">Calculate</button>
                    </form>
                </body>
            </html>`);
        return res.end();
    } 
    
    else if (req.url.toLowerCase() === '/calculate-result' && req.method === 'POST') {
    const body = [];

    req.on('data', (chunk) => {
        body.push(chunk);
    });

    req.on('end', () => {
        const data = Buffer.concat(body).toString();
        const params = new URLSearchParams(data);
        const num1 = parseFloat(params.get('num1'));
        const num2 = parseFloat(params.get('num2'));
        const operation = params.get('operation');

        let result;
        switch (operation) {
            case 'add':
                result = num1 + num2;
                break;
            case 'subtract':
                result = num1 - num2;
                break;
            case 'multiply':
                result = num1 * num2;
                break;
            case 'divide':
                result = num1 / num2;
                break;
            default:
                res.statusCode = 400;
                res.setHeader('Content-Type', 'text/html');
                res.write('<html><body><h1>Invalid Operation</h1><a href="/calculator">Go back to Calculator</a></body></html>');
                return res.end();
        }

        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.write(
            `<html>
                <head>
                    <title>Calculator</title>
                </head>
                <body>
                    <h1>Result</h1>
                    <p>The result of ${num1} ${operation === 'add' ? '+' : operation === 'subtract' ? '-' : operation === 'multiply' ? '*' : '/'} ${num2} is ${result}</p>
                    <a href="/calculator">Go back to Calculator</a>
                </body>
            </html>`
        );
        
        return res.end();
        });
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