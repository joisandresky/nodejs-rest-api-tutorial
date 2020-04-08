const express = require('express');
const router = express.Router();
const controller = require('./todo.controller');

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.put('/:id/finish', controller.finish);
router.delete('/:id', controller.destroy);

module.exports = router;