const express = require('express');
const router = express.Router();

const routeTodo = require('./route.todo');
const routeMain = require('./route.main');

router.use('/', routeMain);
router.use('/todo', routeTodo);

module.exports = router;