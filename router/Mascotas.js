
const express = require('express');
const router = express.Router();

const Mascota = require('../models/mascota');

router.get('/', async (req, res) => {
    try{
        const arrayMascotasDB = await Mascota.find();
        console.log(arrayMascotasDB);

        res.render('mascotas', {
            arrayMascotas: arrayMascotasDB
        })
    }catch(error){
        console.log(error);
    }
});

router.get('/crear', (req, res) => {
    res.render('crear');
});

router.post('/', async(req, res) => {
    const body = req.body;

    try {
        // const mascotaDB = new Mascota(body);
        // mascotaDB.save();

        await Mascota.create(body);

        res.redirect('/mascotas');
    }catch(e){
        console.log(e);
    }
})

router.get('/:id', async(req, res) => {

    const id = req.params.id;

    try {

        const mascotaDB = await Mascota.findOne({_id: id});
        console.log(mascotaDB);

        res.render('detalle', {
            mascota: mascotaDB,
            error: false
        })

    }catch(e) {
        console.log(e);
        res.render('detalle', {
            error: true, 
            mensaje: 'No se encuentra el id seleccionado'
        })
    }
})

router.delete('/:id', async(req, res) => {
    const id = req.params.id;

    try {
        const mascotaDB = await Mascota.findByIdAndDelete({_id: id});

        if(mascotaDB){
            res.json({
                estado: true,
                mensaje: "Eliminado!"
            });
        }else {
            res.json({
                estado: true,
                mensaje: "No se pudo eliminar!"
            });
        }

    }catch(error) {
        console.log(error);
    }
})

router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const body = req.body;

    try{

        const mascotaDB = await Mascota.findByIdAndUpdate({ _id: id }, body,{ useFindAndModify: true });

        console.log(mascotaDB);

        res.json({
            estado: true,
            mensaje: 'Editado!'
        });

    }catch(error) {
        console.log(error);
        res.json({
            estado: false,
            mensaje: 'Editado!'
        });
    }
})

module.exports = router;