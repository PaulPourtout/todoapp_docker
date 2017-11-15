const db = require('./db');

module.exports = {
    getAllCategories() { return db.query('SELECT * FROM categories;')},
    getOneCategory(id) { return db.query(`SELECT * FROM categories WHERE id = ${id};`)},
};