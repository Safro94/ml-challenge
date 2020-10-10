const express = require('express');
const asyncHandler = require('express-async-handler');
const { getItems, getItemById } = require('../controllers/items');

const router = express.Router();

/*
 * GET request to api/items
 */
router.get('/', asyncHandler(getItems));

/*
 * GET request to api/items/:id
 */
router.get('/:id', asyncHandler(getItemById));

module.exports = router;
