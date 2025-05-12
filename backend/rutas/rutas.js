const express = require('express');
const router = express.Router();
const pedidosController = require('../controladores/pedidos');

// Obtener todos los pedidos
router.get('/', pedidosController.obtenerPedidos);

// Crear un nuevo pedido
router.post('/', pedidosController.crearPedido);

// Obtener un pedido específico
router.get('/:id', pedidosController.obtenerPedido);

// Actualizar un pedido
router.put('/:id', pedidosController.actualizarPedido);

// Eliminar un pedido
router.delete('/:id', pedidosController.eliminarPedido);

module.exports = router;