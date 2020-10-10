const express = require('express');
const { getItems, getItemById } = require('../controllers/items');

const router = express.Router();

router.get('/', getItems);
router.get('/:id', getItemById);

module.exports = router;
