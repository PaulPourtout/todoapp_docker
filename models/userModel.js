const db = require('./db');

const catchError = (fn) => {
    return fn().catch(err => console.log("ERROR SQL", err));
}

module.exports = {
    getAllUsers() {return catchError(() => db.query('SELECT * FROM users;'))},
    
    getOneUser(id) {return catchError(() => db.query(`SELECT * FROM users WHERE id = ${id};`))},
    
    // get all todos of one user
    getTodosOfUser(id) {
        return catchError(() => db.query(`
            SELECT users.firstname, users.lastname, todos.name AS todo, categories.name AS category FROM users
            INNER JOIN users_todos ON (users.id = users_todos.user_id)
            INNER JOIN todos ON (todos.id = users_todos.todo_id)
            INNER JOIN categories ON (categories.id = todos.category_id)
            WHERE users.id = ${id};
        `));
    },
  
    getTodosOfUserByCategory(userId, categoryId) {
        return catchError(() => db.query(`
            SELECT todos.name AS todo, categories.name AS category FROM users
            INNER JOIN users_todos ON (users.id = users_todos.user_id)
            INNER JOIN todos ON (todos.id = users_todos.todo_id)
            INNER JOIN categories ON (categories.id = todos.category_id)
            WHERE users.id = ${userId} AND categories.id = ${categoryId} 
        `));
    },
    
    postNewUser(firstname, lastname) {
        return catchError(() => db.query(`INSERT INTO users(id, firstname, lastname) VALUES (DEFAULT, '${firstname}', '${lastname}');`));
    },
    
    updateUser(id, firstname, lastname) {
        return catchError(() => db.query(`UPDATE users SET firstname='${firstname}', lastname='${lastname}' WHERE id=${id}`));
    },
    
    deleteUser(id) {return catchError(() => db.query(`DELETE FROM users WHERE id = ${id};`))},
}