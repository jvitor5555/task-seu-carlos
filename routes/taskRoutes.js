const express = require('express');
const router = express.Router();

const autenticarToken = require('../middleware/authMiddleware');

const taskcontroller = require('../controller/taskController');

router.post('/createtask', autenticarToken, taskcontroller.createTask);
router.get('/listtask', autenticarToken, taskcontroller.listarTasks);
router.put('/updatetask/:id', autenticarToken, taskcontroller.atualizartasks);
router.delete('/deletetask/:id', autenticarToken, taskcontroller.excluirTask);

module.exports = router