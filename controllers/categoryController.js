const express = require('express');
const categoryModel = require('../models/categoryModel');

module.exports = express.Router()
.get('/', (req, res) => {
    categoryModel.getAllCategories()
    .then(data => res.json(data.rows))
    .catch(err => res.json(err));
})

.get('/:id', (req, res) => {
    const {id} = req.params;
    categoryModel.getOneCategory(id)
    .then(data => res.json(data.rows[0]))
    .catch(err => res.json(err));
})

.get('/:id/todos', (req, res) => {
    const {id} = req.params;
    categoryModel.getOneCategoryTodos(id)
    .then(data => res.json(data.rows))
    .catch(err => res.json(err));
});