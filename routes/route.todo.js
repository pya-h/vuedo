const express = require('express');
const router = express.Router();
const todoControl = require('./controllers/todo');

router.post('/', todoControl.add);

router.get('/', todoControl.fetch);

router.delete('/', todoControl.remove);

router.put('/', todoControl.update);

module.exports = router;