var Teacher = require('../models/teacher');
//var async = require('async');
var debug = require('debug');


// Manda los datos de todos los maestros
exports.teacher_list = function(req, res, next) {
	Teacher.find()
	.exec(function(err, results) {
		if(err) { return next(err); }
		if(results == null) {
			res.format({
				'application/json' : function() {
					res.send({});
				}
			});

			return;
		}

		res.send(results);
	});
}

// Manda los datos de un solo maestro
exports.teacher_details = function(req, res, next) {
	Teacher.findById(req.params.id).exec(function(err, result) {
		if(err) {return next(err);}
		if(result==null) {
			//No hay resultados
			res.format({
				'application/json': function() {
					res.send({});
				}
			});

			return;
		}

		res.send(result);
	});
}

// Crea un nuevo maestro
exports.teacher_create = function(req, res, next) {
	debug(req.body);

	var teacher = new Teacher({
		nombre: req.body.nombre,
		apellido: req.body.apellido,
		identificacion: req.body.identificacion,
		carrera: req.body.carrera,
		horario: req.body.horario,
		correo: req.body.correo,
		contrasenia: req.body.contrasenia
	});

	debug(teacher);
	

	teacher.save(function(err) {
		if(err) { 
			res.send('ERROR: ' + err);
			return next(err); 
		}
		res.send('OK');
	});
}

// Actuliza datos de un maestro
exports.teacher_update = function(req, res, next) {
	var teacher = {
		nombre: req.body.nombre,
		apellido: req.body.apellido,
		identificacion: req.body.identificacion,
		carrera: req.body.carrera,
		horario: req.body.horario,
		correo: req.body.correo,
		contrasenia: req.body.contrasenia
	};

	debug(req.body);
	debug(teacher);

	
	Teacher.where({_id: req.params.id}).update({}, teacher, function(err) {
		if(err) {return next(err);}
		res.send('OK');
	});
}

// Elimina datos de un maestro
exports.teacher_delete = function(req, res, next) {
	Teacher.remove({_id: req.params.id}, {}, function(err) {
		if(err) {return next(err);}
		res.send('OK');
	});
}