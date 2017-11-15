const express = require('express');
const categoryModel = require('../models/categoryModel');

module.exports = express.Router()
.get('/', (req, res) => {
    categoryModel.getAllCategories()
    .then(data => res.json(data.rows))
    .catch(err => console.log(err));
})

.get('/:id', (req, res) => {
    const {id} = req.params;
    categoryModel.getOneCategory(id)
    .then(data => res.json(data.rows[0]))
    .catch(err => console.log('error', err));
});