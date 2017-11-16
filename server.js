const express = require('express');
const app = express();
const pug = require('pug');
const userController = require('./controllers/userController');
const todoController = require('./controllers/todoController');
const categoryController = require('./controllers/categoryController')
const db = require('./models/db');

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
});
// parse application/json
app.use(express.json());

/*
// USING PUG TO DISPLAY SOME DATAS
    // Set Template Engine
    app.set('view engine', 'pug');

    app.get('/', (req,res) => {
        todos = db.query('SELECT * FROM todos;')
        .then(data => {
            res.render('index', {
                datas: data.rows,
                title: "My Todo Ap"
            });
        })
        .catch(err => console.log("error", err));
    });
*/

app.use('/users', userController);
app.use('/todos', todoController);
app.use('/categories', categoryController);

app.get('/*', (req, res) => res.send("ERROR 404 : Page not found"));

app.listen(3000, (err) => {
    try {
        console.log("Server listens port 3000")
    }
    catch (err) {
        console.log('error', err);
    }
});