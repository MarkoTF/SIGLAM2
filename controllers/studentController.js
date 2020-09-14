var Student = require('../models/student');
//var async = require('async');
var debug = require('debug')('siglam:GuardarEstudiante');

// Manda los datos de todos los estudiantes
exports.student_list = function(req, res, next) {

	Student.find()
	.exec(function(err, results) {
		if(err) {return next(err);}
		if(results==null) {
			//No hay resultados
			res.format({
				'application/json' : function() {
					res.send({});
				}
			});

			return;
		}

		//Si hay resusltados
		res.send(results);
	});

}

// Manda los datos de un solo estudiante
exports.student_details = function(req, res, next) {
	Student.findById(req.params.id).exec(function(err, result) {
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

// Crea un nuevo estudiante
exports.student_create = function(req, res, next) {
	var student = new Student({
		nombre: req.body.nombre,
		apellido: req.body.apellido,
		numeroControl: req.body.numeroControl,
		carrera: req.body.carrera,
		horario: req.body.horario,
		correo: req.body.correo,
		contrasenia: req.body.contrasenia
	});

	debug(student);
	debug(req.body);

	student.save(function(err) {
		if(err) { 
			res.send('ERROR: ' + err);
			return next(err); 
		}
		res.send('OK');
	});
}

// Actuliza datos de un estudiante
exports.student_update = function(req, res, next) {
	var student = {
		nombre: req.body.nombre,
		apellido: req.body.apellido,
		numeroControl: req.body.numeroControl,
		carrera: req.body.carrera,
		horario: req.body.horario,
		correo: req.body.correo,
		contrasenia: req.body.contrasenia
	};

	debug(req.body);
	debug(student);

	
	Student.where({_id: req.params.id}).update({}, student, function(err) {
		if(err) {return next(err);}
		res.send('OK');
	});
	

	/*
	Student.findByIdAndUpdate(req.params.id, student, {}, function(err, result) {
		if(err){ return next(err); }
		res.send('OK');
	});
	*/
}

// Elimina datos de un estudiante
exports.student_delete = function(req, res, next) {
	Student.remove({_id: req.params.id}, {}, function(err) {
		if(err) {return next(err);}
		res.send('OK');
	});
}