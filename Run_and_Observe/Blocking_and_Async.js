const fs = require('fs');

console.log('1. Start of the program');

//synchronous blocking code
console.log('2. Reading file synchronously...');
const datasync = fs.readFileSync('sample.txt', 'utf-8');
console.log('3. File content (sync):', datasync);  

//asynchronous non-blocking code
console.log('4. Reading file asynchronously...');      
fs.readFile('sample.txt', 'utf-8', (err, dataasync) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }
    console.log('5. File content (async):', dataasync);
});

console.log('6. Program finished');

//may be the output will be in this order:
//1. Start of the program
//2. Reading file synchronously...
//3. File content (sync): [content]
//4. Reading file asynchronously...
//6. Program finished
//5. File content (async): [content]