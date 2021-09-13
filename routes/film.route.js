const express = require('express');
const filmModel = require('../models/film.model');
const validate = require('../midlewares/validate.mdw');
const schema = require('../schemas/film.json')

const router = express.Router();

router.get('/', async function(req, res) {
    const rows = await filmModel.findAll();
    res.json(rows);
})
router.get('/:id', async function(req, res) {
    const id = +req.params.id || 0;
    const film = await filmModel.findById(id);

    if (film === null) {
        return res.status(204).end();
    }
    res.json(film);
})


router.post('/', validate(schema), async function(req, res) {
    const film = req.body;
    const result = await filmModel.add(film);
    film.film_id = result[0];
    res.status(201).json(film);
})

router.delete('/:id', async function(req, res) {
    const id = req.params.id || -1;
    if (id === -1) {
        return res.json({
            message: 'NO Film DELETED.'
        });
    }
    const result = await filmModel.del(id);
    if (result === 0) {
        return res.json({
            message: 'NO Film DELETED.'
        });
    }
    console.log(result);

    res.json({
        message: 'Film DELETED.'
    });
})

router.patch('/', async function(req, res) {
    const film = req.body;

    const id = film.film_id;
    delete film.film_id;

    const result = await filmModel.patch(id, film);
    console.log(result);
    if (result === 0) {
        return res.json(304).end();
    }
    res.json(film);
})

module.exports = router;