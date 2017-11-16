const db = require('./db');

const catchError = (fn) => {
    return fn().catch(err => console.log("ERROR SQL", err));
}

module.exports = {
    getAllCategories() {
        return catchError(() => db.query('SELECT * FROM categories;'))
    },
    getOneCategory(id) {
        return catchError(() => db.query(`SELECT * FROM categories WHERE id = ${id};`))
    },
    getOneCategoryTodos(id) {
        return catchError(() => db.query(`
            SELECT todos.name, categories.name AS category FROM categories
            INNER JOIN todos ON (categories.id = todos.category_id)
            WHERE categories.id = ${id}
        `));
    },
};