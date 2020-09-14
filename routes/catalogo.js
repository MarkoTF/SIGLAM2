var express = require('express');
var router = express.Router();

// Controladores requeridos
var tool_controller = require('../controllers/toolController');
var lend_controller = require('../controllers/lendController');
var category_controller = require('../controllers/categoryController');


// RUTAS DE LAS HERRAMIENTAS

// GET para mostrara la Lis de todas las herramientas
router.get('/herramienta', tool_controller.tool_list);
// GET para mostrar una sola erramienta
router.get('/herramienta/:id', tool_controller.tool_details);
// POST para registrar una nueva herramienta
router.post('/herramienta/registrar', tool_controller.tool_create);
// POST para actualizar una herramienta
router.post('/herramienta/:id/actualizar', tool_controller.tool_update);
// POST para eliminar una herramienta
router.post('/herramienta/:id/eliminar', tool_controller.tool_delete);


// RUTAS PARA LOS PRESTAMOS

// GET para mostrar los prestamos
router.get('/prestamo', lend_controller.lend_list);
// GET para dertalles de una sola herramieta
router.get('/prestamo/:id', lend_controller.lend_details);
// POST para registrar un nuevo prestamo
router.post('/prestamo/registrar', lend_controller.lend_create);
// POST para actualizar información de un prestamo
router.post('/prestamo/:id/actualizar', lend_controller.lend_update);
// POST para eliminar una herramienta
router.post('/prestamo/:id/eliminar', lend_controller.lend_delete);


// RUTAS PARA LAS CATEGORIAS

// GET para mostrar todas las categorías
router.get('/categoria', category_controller.category_list);
// GET para una sola categoría
router.get('/categoria/:id', category_controller.category_details);
// POST para registrar una nueva categoría
router.post('/categoria/registrar', category_controller.category_create);
// POST para actualizar una categoría
router.post('/categoria/:id/actualizar', category_controller.category_update);
// POST para eliminar una categoía
router.post('/categoria/:id/eliminar', category_controller.category_delete);


module.exports = router;