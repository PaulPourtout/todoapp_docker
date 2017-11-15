const db = require('./db');

module.exports = {
    getAllCategories() { return db.query('SELECT * FROM categories;')},
    getOneCategory(id) { return db.query(`SELECT * FROM categories WHERE id = ${id};`)},
    getOneCategoryTodos(id) {
        return db.query(`
            SELECT todos.name, categories.name AS category FROM categories
            INNER JOIN todos ON (categories.id = todos.category_id)
            WHERE categories.id = ${id}
        `);
    },
};