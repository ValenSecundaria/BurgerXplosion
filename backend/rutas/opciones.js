const express = require('express');
const router = express.Router();
const opcionesController = require('../controladores/opciones');

// Obtener todas las opciones
router.get('/', opcionesController.obtenerOpciones);

module.exports = router;