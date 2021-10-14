// SERVIDOR HTTP
// const http = require('http');
// const server = http.createServer((req, res) => {
//     res.end('Estoy respondiendo a tu solicitud v')
// });

// const puerto = 3000;

// server.listen(puerto, () => {
//     console.log('Escuchando Solicitudes');
// })

// USANDO LIBRERIA EXPRESS
const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

require('dotenv').config()

const port = process.env.PORT || 3000;

// <Conexión a Base de datos>
const mongoose = require('mongoose');

const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.xkp45.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=> {
    console.log("Base de datos conectada");
}).catch(error => {
    console.log(error);
});
// <Termina Conexión a base de datos>

// Motor de plantillas
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(express.static(__dirname + '/public'));

// Rutas Web
app.use('/', require('./router/rutasWeb'));
app.use('/mascotas', require('./router/Mascotas'));

app.use((req, res, next) => {
    res.status(404).render("404", {titulo404: 'Página 404'})
})

app.listen(port, () => {
    console.log(`Servidor a su servivio en el puerto: ${port}`);
})