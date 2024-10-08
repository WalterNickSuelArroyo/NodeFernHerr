const http = require('http');

const server = http.createServer((req, res) => {
    res.setHeader('Content-Disposition', 'attachment; filename=lista.csv');
    // res.writeHead(200, {'Content-Type' : 'application/json'})
    res.writeHead(200, { 'Content-Type': 'application/csv' });
    
    res.write('id, nombre\n');
    res.write('1, Fernando\n');
    res.write('2, Maria\n');
    res.write('3, Juan\n');
    res.write('4, Pedro\n');

    res.end();
});

server.listen(8080, () => {
    console.log('Servidor escuchando en el puerto 8080');
});

