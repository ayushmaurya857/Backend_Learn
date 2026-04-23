const http = require('http');

// function requestListener(req, res){
//     console.log('Request received');
// }
// const server = http.createServer(requestListener);

// server.listen(8080, () => {
//     console.log('Server is listening on port 8080');
// });

const server = http.createServer((req, res)=>{
    console.log(req);
})
server.listen(8081, () => {
    console.log('Server is listening on port 8080');
});