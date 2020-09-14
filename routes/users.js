var express = require('express');
var router = express.Router();

// Controladores requeridos
var student_controller = require('../controllers/studentController');
var teacher_controller = require('../controllers/teacherController');
var worker_controller = require('../controllers/workerController');


// RUTAS PARA LOS ESTUDIANTES

// GET para listar todos los estudiantes
router.get('/estudiante', student_controller.student_list);
// GET para los detaller de un solo estudiante
router.get('/estudiante/:id', student_controller.student_details);
// POST para registrar un nuevo alumno
router.post('/estudiante/registrar', student_controller.student_create);
// POSt para actualizar información de un alumno
router.post('/estudiante/:id/actualizar', student_controller.student_update);
// POST para eliminar a un estudiante
router.post('/estudiante/:id/eliminar', student_controller.student_delete);


// RUTAS PARA LOS MAESTROS

// GET para listar todos los estudiantes
router.get('/maestro', teacher_controller.teacher_list);
// GET para los detaller de un solo estudiante
router.get('/maestro/:id', teacher_controller.teacher_details);
// POST para registrar un nuevo alumno
router.post('/maestro/registrar', teacher_controller.teacher_create);
// POSt para actualizar información de un alumno
router.post('/maestro/:id/actualizar', teacher_controller.teacher_update);
// POST para eliminar a un estudiante
router.post('/maestro/:id/eliminar', teacher_controller.teacher_delete);


// RUTAS PARA LOS TRABAJADORES

// GET para listar todos los estudiantes
router.get('/trabajador', worker_controller.worker_list);
// GET para los detaller de un solo estudiante
router.get('/trabajador/:id', worker_controller.worker_details);
// POST para registrar un nuevo alumno
router.post('/trabajador/registrar', worker_controller.worker_create);
// POSt para actualizar información de un alumno
router.post('/trabajador/:id/actualizar', worker_controller.worker_update);
// POST para eliminar a un estudiante
router.post('/trabajador/:id/eliminar', worker_controller.worker_delete);

module.exports = router;