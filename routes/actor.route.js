const express = require('express');
const actorModel = require('../models/actor.model');
const validate = require('../midlewares/validate.mdw');
const schema = require('../schemas/actor.json')

const router = express.Router();

router.get('/', async function(req, res) {
    const rows = await actorModel.findAll();
    res.json(rows);
})
router.get('/:id', async function(req, res) {
    const id = +req.params.id || 0;
    const actor = await actorModel.findById(id);

    if (actor === null) {
        return res.status(204).end();
    }
    res.json(actor);
})
router.post('/', validate(schema), async function(req, res) {
    const actor = req.body;
    const result = await actorModel.add(actor);
    actor.actor_id = result[0];
    res.status(201).json(actor);
})

router.delete('/:id', async function(req, res) {
    const id = req.params.id || -1;
    if (id === -1) {
        return res.json({
            message: 'NO Actor DELETED.'
        });
    }
    const result = await actorModel.del(id);
    if (result === 0) {
        return res.json({
            message: 'NO Actor DELETED.'
        });
    }
    console.log(result);

    res.json({
        message: 'Actor DELETED.'
    });
})

router.patch('/', async function(req, res) {
    const actor = req.body;

    const id = actor.actor_id;
    delete actor.actor_id;

    const result = await actorModel.patch(id, actor);
    console.log(result);
    if (result === 0) {
        return res.json(304).end();
    }
    res.json(actor);
})

module.exports = router;