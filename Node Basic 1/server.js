//  Creating 1st Node Server

const http = require('http');
const server = http.createServer((req,res)=>{
    console.log(req);
});

const port = 3001;
server.listen(port, ()=>{
console.log(`server running on port ${port}`);
});