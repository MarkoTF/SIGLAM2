var Lend = require('../models/lend');
//var async = require('async');

// Manda los datos de todos los prestamos
exports.lend_list = function(req, res, next) {
	Lend.find()
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

// Manda los datos de un solo prestamos
exports.lend_details = function(req, res, next) {
	Lend.findById(req.params.id).exec(function(err, result) {
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

// Crea un nuevo prestamos
exports.lend_create = function(req, res, next) {
	var lend = new Lend({
		estudiante: req.body.estudiante,
		maestro: req.body.maestro,
		trabajador: req.body.trabajador,
		herramientas: req.body.herramientas,
		fecha: req.body.fecha
	});

	lend.save(function(err) {
		if(err) { 
			res.send('ERROR: ' + err);
			return next(err); 
		}
		res.send('OK');
	});
}

// Actuliza datos de un prestamos
exports.lend_update = function(req, res, next) {
	var lend = {
		estudiante: req.body.estudiante,
		maestro: req.body.maestro,
		trabajador: req.body.trabajador,
		herramientas: req.body.herramientas,
		fecha: req.body.fecha
	};
	
	Lend.where({_id: req.params.id}).update({}, lend, function(err) {
		if(err) {return next(err);}
		res.send('OK');
	});
}

// Elimina datos de un prestamos
exports.lend_delete = function(req, res, next) {
	Lend.remove({_id: req.params.id}, {}, function(err) {
		if(err) {return next(err);}
		res.send('OK');
	});
}