const express = require('express');
const router = express.Router();
const pedidosController = require('../controladores/pedidos');

// Obtener todas las opciones
router.post('/crearPedido', pedidosController.crearPedido);
router.get('/obtenerPedido', pedidosController.obtenerPedidos);
router.delete('/eliminar/:id', pedidosController.eliminarPedido);
router.get('/ver/:id', pedidosController.verPedido);
router.post('/modificar/:id', pedidosController.modificarPedido);
module.exports = router;