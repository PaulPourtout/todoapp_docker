const db = require('./db');

const catchError = (fn) => {
    return fn().catch(err => console.log("ERROR SQL: ", err));
}

module.exports = {
    getAllTodos() {
        return catchError(() => db.query('SELECT * FROM todos;'));
    },
    getOneTodo(id) {
        return catchError(() => db.query(`SELECT * FROM todos WHERE id = ${id};`));
    },
    postNewTodo(name, category) {
        return catchError(() => db.query(`INSERT INTO todos(id, name, category_id) VALUES (DEFAULT, '${name}', ${category});`));
    },   
    updateTodo(id, name, category_id) {
        return catchError(() => db.query(`UPDATE todos SET name = '${name}', category_id = ${category_id} WHERE (id = ${id});`));
    },
    deleteTodo(id) {
        return catchError(() => db.query(`DELETE FROM todos WHERE id = ${id};`));
    },
}