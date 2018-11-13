var express = require('express'),
    router = express.Router(),
    materiaModel = require('../models/Materia');

router.get('/', function (req, res) {
    materiaModel.find({}, function (err, materias) {
        if (err) {
            res.status(500);
            res.json({
                status: 500,
                err
            });
        } else {

            res.json(materias);
        }
    });
});

router.get('/:name', function (req, res) {
    if (req.params.name) {
        materiaModel.findOne({
            nombre: req.params.name
        }, function (err, materia) {
            if (err) {
                res.status(500);
                res.json({
                    status: 500,
                    err
                });
            } else {
                res.json(materia);
            }
        });
    } else {
        res.status(400);
        res.json({
            status: 400,
            err: 'Bad Request'
        })
    }
});

router.get('/delete/:id', async (req, res, next)=>{
    var {id} = req.params;
    await materiaModel.remove({_id: id});
    res.send({message: "Deleted" , success:true});
  });

router.post('/update/:id', async (req, res, next)=>{
    var {id} = req.params;
    console.log(req.body);
    console.log({id});
    await materiaModel.updateOne({_id: id},req.body, function (err, materia) {
        if (err) {
            res.status(500);
            res.json({
                status: 500,
                err
            });
        } else {
            res.send(materia);
        }
    })
  });

router.post('/', function(req,res){
    let Materia = new materiaModel({
        nombre: req.body.nombre,
        uv: req.body.uv,
        descripcion: req.body.descripcion
    })

    Materia.save(function(err){
        if (err){
            res.status(500)
            res.send({err});
        }
        res.send({message: "saved" , success:true});
    });
});

module.exports = router;