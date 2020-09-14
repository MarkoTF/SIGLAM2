var Worker = require('../models/worker');
//var async = require('async');


// Manda los datos de todos los trabajadores
exports.worker_list = function(req, res, next) {
	
	Worker.find()
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

// Manda los datos de un solo trabajador
exports.worker_details = function(req, res, next) {
	Worker.findById(req.params.id).exec(function(err, result) {
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

// Crea un nuevo trabajador
exports.worker_create = function(req, res, next) {
	var worker = new Worker({
		nombre: req.body.nombre,
		apellido: req.body.apellido,
		identificacion: req.body.identificacion,
		horario: req.body.horario,
		correo: req.body.correo,
		contrasenia: req.body.contrasenia
	});


	worker.save(function(err) {
		if(err) { 
			res.send('ERROR: ' + err);
			return next(err); 
		}
		res.send('OK');
	});
}

// Actuliza datos de un trabajador
exports.worker_update = function(req, res, next) {
	var worker = {
		nombre: req.body.nombre,
		apellido: req.body.apellido,
		identificacion: req.body.identificacion,
		horario: req.body.horario,
		correo: req.body.correo,
		contrasenia: req.body.contrasenia
	};

	
	Worker.where({_id: req.params.id}).update({}, worker, function(err) {
		if(err) {return next(err);}
		res.send('OK');
	});
}

// Elimina datos de un trabajador
exports.worker_delete = function(req, res, next) {
	Worker.remove({_id: req.params.id}, {}, function(err) {
		if(err) {return next(err);}
		res.send('OK');
	});
}