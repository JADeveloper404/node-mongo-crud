const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render("index", {titulo: 'Mi Título Dinámico'});
});

router.get('/servicios', (req, res) => {
    res.render("servicios", {tituloServicios: 'Página de Servicios'})
})

module.exports = router;