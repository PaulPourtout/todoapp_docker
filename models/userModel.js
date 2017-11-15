"use strict";

const db = require('./db');

module.exports = {
    getAllUsers() {return db.query('SELECT * FROM users;')},
    
    getOneUser(id) {return db.query(`SELECT * FROM users WHERE id = ${id};`)},
    
    // get all todos of one user
    getTodosOfUser(id) {
        return db.query(`
            SELECT users.firstname, users.lastname, todos.name AS todo, categories.name AS category FROM users
            INNER JOIN users_todos ON (users.id = users_todos.user_id)
            INNER JOIN todos ON (todos.id = users_todos.todo_id)
            INNER JOIN categories ON (categories.id = todos.category_id)
            WHERE users.id = ${id};
        `);
    },
  
    getTodosOfUserByCategory(userId, categoryId) {
        return db.query(`
            SELECT todos.name AS todo, categories.name AS category FROM users
            INNER JOIN users_todos ON (users.id = users_todos.user_id)
            INNER JOIN todos ON (todos.id = users_todos.todo_id)
            INNER JOIN categories ON (categories.id = todos.category_id)
            WHERE users.id = ${userId} AND categories.id = ${categoryId} 
        `);
    },
    
    postNewUser(firstname, lastname) {
        return db.query(`INSERT INTO users(id, firstname, lastname) VALUES (DEFAULT, '${firstname}', '${lastname}');`);
    },
    
    updateUser(id, firstname, lastname) {
        return db.query(`UPDATE users SET firstname='${firstname}', lastname='${lastname}' WHERE id=${id}`);
    },
    
    deleteUser(id) {return db.query(`DELETE FROM users WHERE id = ${id};`)},
}