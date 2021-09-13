const db = require("../utils/db");

module.exports = {
    findAll() {
        return db('customer');

    },

    async findById(id) {
        const rows = await db('customer').where('customer_id', id)
        if (rows.length === 0) {
            return null;
        }


        return rows[0];
    },

    add(customer) {
        return db('customer').insert(customer);
    },
    del(id) {
        return db('customer')
            .where('customer_id', id)
            .del();
    },
    patch(id, customerwithoutid) {
        return db('customer')
            .where('customer_id', id)
            .update(customerwithoutid);
    },
};