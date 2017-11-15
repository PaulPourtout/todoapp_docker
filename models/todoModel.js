const db = require('./db');

module.exports = {
    getAllTodos() { return db.query('SELECT * FROM todos;')},
    getOneTodo(id) { return db.query(`SELECT * FROM todos WHERE id = ${id};`)},
    postNewTodo(name, category) {return db.query(`INSERT INTO todos(id, name, category_id) VALUES (DEFAULT, '${name}', ${category});`)},   
    updateTodo(id, name, category_id) { return db.query(`UPDATE todos SET name = '${name}', category_id = ${category_id} WHERE (id = ${id});`)},
    deleteTodo(id) { return db.query(`DELETE FROM todos WHERE id = ${id};`)},
}