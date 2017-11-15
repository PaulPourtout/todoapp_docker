const express = require('express');
const app = express();
const pug = require('pug');

const client = require('pg').Client;

// parse application/json
app.use(express.json())

const db = new client({
    user: 'user1',
    host: 'localhost',
    database: 'tododb',
    password: 'changeme',
    port: 5432
    // connectionString: 'postgres://user1:changeme@localhost:5412/tododb'
});

db.connect((err) => {
    try {
        console.log("DB connected");
    }
    catch (err) {
        return console.log('error', err);
    }
});


app.set('view engine', 'pug');

app.get('/', (req,res) => {
    todos = db.query('SELECT * FROM todos;')
    .then(data => {
        res.render('index', {
            datas: data.rows
        });
    })
    .catch(err => console.log("error", err));
});

// Categories API
app.get('/categories', (req, res) => {
    categories = db.query('SELECT * FROM categories;')
    .then(data => res.json(data.rows))
    .catch(err => console.log(err));
});

app.get('/categories/:id', (req, res) => {
    categories = db.query('SELECT * FROM categories WHERE id = $1;', [req.params.id])
    .then(data => res.json(data.rows[0]))
    .catch(err => console.log('error', err));
});

app.post('/categories', (req, res) => {
    const {name} = req.body;
    db.query(`INSERT INTO categories(id, name) VALUES (DEFAULT, '${name}');`)
    .then(data => res.send(req.body))
    .catch(err => console.log('error', err));
});

app.delete('/categories/:id', (req, res) => {
    const {id} = req.params;
    db.query(`DELETE FROM categories WHERE id = ${id};`)
    .then(data => res.send(data))
    .catch(err => console.log("error", err));
});

// TODOS API
app.get('/todos', (req, res) => {
    todos = db.query('SELECT * FROM todos;')
    .then(data => res.json(data.rows))
    .catch(err => console.log('error', err));
});

app.get('/todos/:id', (req, res) => {
    todos = db.query('SELECT * FROM todos WHERE id = $1;', [req.params.id])
    .then(data => res.json(data.rows[0]))
    .catch(err => console.log('error', err));
});

app.post('/todos', (req, res) => {
    const {name, category} = req.body;
    db.query(`INSERT INTO todos(id, name, category_id) VALUES (DEFAULT, '${name}', ${category});`)
    .then(data => res.send(req.body))
    .catch(err => console.log('error', err));
});

app.put('/todos/:id', (req, res) => {
    const {name, category_id} = req.body;
    db.query(`UPDATE todos SET name = '${name}', category_id = ${category_id} WHERE (id = ${req.params.id});`)
    .then(data => res.send(data))
    .catch(err => console.log("Error", err));
});

app.delete('/todos/:id', (req, res) => {
    const {id} = req.params;
    db.query(`DELETE FROM todos WHERE id = ${id};`)
    .then(data => res.send(data))
    .catch(err => console.log('error', err));
});


// USERS API
app.get('/users', (req, res) => {
    users = db.query('SELECT * FROM users;')
    .then(data => res.json(data.rows))
    .catch(err => console.log('error', err));
});

app.get('/users/:id', (req, res) => {
    const {id} = req.params;
    users = db.query(`SELECT * FROM users WHERE id = ${id};`)
    .then(data => res.json(data.rows[0]))
    .catch(err => console.log('error', err));
});

// get all todos of one user
app.get('/users/:id/todos', (req,res) => { 
    const {id} = req.params;
    db.query(`SELECT users.firstname, users.lastname, todos.name AS todo, categories.name AS category FROM users
              INNER JOIN users_todos on (users.id = users_todos.user_id)
              INNER JOIN todos on (users_todos.todo_id = todos.id)
              INNER JOIN categories on (todos.category_id = categories.id)
              WHERE users.id = ${id};`)
    .then(data => res.send(data.rows))
    .catch(err => console.log("error:", err));
});

app.post('/users', (req, res) => {
    const {firstname, lastname} = req.body;
    db.query(`INSERT INTO users(id, firstname, lastname) VALUES (DEFAULT, '${firstname}', '${lastname}');`)
    .then(data => res.send(req.body))
    .catch(err => console.log("error", err));
});

app.put('/users/:id', (req, res) => {
    const {firstname, lastname} = req.body;
    const {id} = req.params;
    db.query(`UPDATE users SET firstname='${firstname}', lastname='${lastname}' WHERE id=${id}`)
});

app.delete('/users/:id', (req, res) => {
    const {id} = req.params;
    db.query(`DELETE FROM users WHERE id = ${id};`)
    .then(data => res.send(data))
    .catch(err => console.log("error", err));
});





app.get('/*', (req, res) => res.send("ERROR 404 : Page not found"));

app.listen(3000, (err) => {
    try {
        console.log("Server listens port 3000")
    }
    catch (err) {
        console.log('error', err);
    }
});