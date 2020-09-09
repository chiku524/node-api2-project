const server = require('./server.js');

port = 5000;

server.listen(port, () => {
    console.log(`Server running on localhost:${port}`);
}); 