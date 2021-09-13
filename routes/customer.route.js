const express = require('express');
const customerModel = require('../models/customer.model');
const validate = require('../midlewares/validate.mdw');
const schema = require('../schemas/customer.json')

const router = express.Router();

router.get('/', async function(req, res) {
    const rows = await customerModel.findAll();
    res.json(rows);
})
router.get('/:id', async function(req, res) {
    const id = +req.params.id || 0;
    const customer = await customerModel.findById(id);

    if (customer === null) {
        return res.status(204).end();
    }
    res.json(customer);
})
router.post('/', validate(schema), async function(req, res) {
    const customer = req.body;
    const result = await customerModel.add(customer);
    console.log(result);

    customer.customer_id = result[0];
    res.status(201).json(customer);
})

router.delete('/:id', async function(req, res) {
    const id = req.params.id || -1;
    if (id === -1) {
        return res.json({
            message: 'NO customer DELETED.'
        });
    }
    const result = await customerModel.del(id);
    if (result === 0) {
        return res.json({
            message: 'NO customer DELETED.'
        });
    }
    console.log(result);

    res.json({
        message: 'customer DELETED.'
    });
})

router.patch('/', async function(req, res) {
    const customer = req.body;

    const id = customer.customer_id;
    delete customer.customer_id;

    const result = await customerModel.patch(id, customer);
    console.log(result);
    if (result === 0) {
        return res.json(304).end();
    }
    res.json(customer);
})

module.exports = router;