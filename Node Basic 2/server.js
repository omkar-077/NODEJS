//  Sending Response - (Raw using Node js only) (Difficult)

const http = require('http');
const server = http.createServer((req,res)=>{
    res.setHeader('content-type', 'text/html');
    res.write('<html>');
    res.write('<head> <title> Sending Response </title></head>');
    res.write('<body><h1>Like/Subscribe</h1> <h2>xxx</h2></body>');
    res.write('</html>');
    res.end();
});

const port = 3000;
server.listen(port, ()=>{
    console.log(`server running on port ${port}`);
});