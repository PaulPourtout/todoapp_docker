const express = require('express');
const todoModel = require('../models/todoModel');

module.exports = express.Router()
.get('/', (req, res) => {
    todoModel.getAllTodos()
    .then(data => res.json(data.rows))
    .catch(err => console.log('error', err));
})

.get('/:id', (req, res) => {
    const {id} = req.params;
    todoModel.getOneTodo(id)
    .then(data => res.json(data.rows[0]))
    .catch(err => console.log('error', err));
})

.post('', (req, res) => {
    const {name, category_id} = req.body;
    todoModel.postNewTodo(name, category_id)
    .then(data => res.json(req.body))
    .catch(err => console.log('error', err));
})

.put('/:id', (req, res) => {
    const {name, category_id} = req.body;
    const {id} = req.params;
    todoModel.updateTodo(id, name, category_id)
    .then(data => res.json(data))
    .catch(err => console.log("Error", err));
})

.delete('/:id', (req, res) => {
    const {id} = req.params;
    todoModel.deleteTodo(id)
    .then(data => res.json(data))
    .catch(err => console.log('error', err));
});