const db = require("../utils/db");

module.exports = {
    findAll() {
        return db('actor');

    },

    async findById(id) {
        const rows = await db('actor').where('actor_id', id)
        if (rows.length === 0) {
            return null;
        }


        return rows[0];
    },

    add(film) {
        return db('actor').insert(film);
    },
    del(id) {
        return db('actor')
            .where('actor_id', id)
            .del();
    },
    patch(id, actorithoutid) {
        return db('actor')
            .where('actor_id', id)
            .update(actorithoutid);
    },
};