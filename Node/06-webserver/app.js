const express = require('express')
const app = express();
require('dotenv').config();
const port = process.env.PORT;

//Handlebars
const hbs = require('hbs');
hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');

// Servir contenido extático
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('home', {
        nombre: 'Walter Suel',
        titulo: 'Curso Node'
    });
});

app.get('/generic', (req, res) => {
    res.render('generic', {
        nombre: 'Walter Suel',
        titulo: 'Curso Node'
    });
});

app.get('/elements', (req, res) => {
    res.render('elements', {
        nombre: 'Walter Suel',
        titulo: 'Curso Node'
    });
});

app.get('*', (req, res) => {
    res.sendFile(__dirname + '/public/404.html');
});
app.listen(port)