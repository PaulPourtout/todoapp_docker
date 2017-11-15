const express = require('express');
const userModel = require('../models/userModel');

module.exports = express.Router()
.get('/', (req, res) => {
    userModel.getAllUsers()
    .then(data => res.json(data.rows))
    .catch(err => res.json(err));
})

.get('/:id', (req, res) => {
    const {id} = req.params;
    userModel.getOneUser(id)
    .then(data => res.json(data.rows[0]))
    .catch(err => res.json(err));
})

// get all todos of one user
.get('/:id/todos', (req, res) => { 
    const {id} = req.params;
    userModel.getTodosOfUser(id)
    .then(data => res.json(data.rows))
    .catch(err => res.json(err));
})

.get('/:userId/todos/:categoryId', (req, res) => {
    const {userId, categoryId} = req.params;
    userModel.getTodosOfUserByCategory(userId, categoryId)
    .then(data => res.json(data.rows))
    .catch(err => res.json(err));
})

.post('', (req, res) => {
    const {firstname, lastname} = req.body;
    userModel.postNewUser(firstname, lastname)
    .then(data => res.json(req.body))
    .catch(err => res.json(err));
})

.put('/:id', (req, res) => {
    const {firstname, lastname} = req.body;
    const {id} = req.params;
    userModel.updateUser(id, firstname, lastname)
    .then(data => res.json(data))
    .catch(err => res.json(err));
})

.delete('/:id', (req, res) => {
    const {id} = req.params;
    userModel.deleteUser(id)
    .then(data => res.json(data))
    .catch(err => res.json(err));
})