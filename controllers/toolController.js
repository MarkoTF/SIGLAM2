var Tool = require('../models/tool');
var async = require('async');

// Manda los datos de todos los herramientas
exports.tool_list = function(req, res, next) {
	Tool.find()
	.exec(function(err, results) {
		if(err)  { return next(err); }

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

// Manda los datos de un solo herramienta
exports.tool_details = function(req, res, next) {
	Tool.findById(req.params.id).exec(function(err, result) {
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

// Crea un nuevo herramienta
exports.tool_create = function(req, res, next) {
	var tool =  new Tool({
		nombre: req.body.nombre,
		modelo: req.body.modelo,
		descripcion: req.body.descripcion,
		categoria: req.body.categoria,
		cantidad: req.body.cantidad
	});

	tool.save(function(err) {
		if(err) { 
			res.send('ERROR: ' + err);
			return next(err); 
		}

		res.send('OK');
	});
}

// Actuliza datos de un herramienta
exports.tool_update = function(req, res, next) {
	var tool = {
		nombre: req.body.nombre,
		modelo: req.body.modelo,
		descripcion: req.body.descripcion,
		categoria: req.body.categoria,
		cantidad: req.body.cantidad
	};

	
	Tool.where({_id: req.params.id}).update({}, tool, function(err) {
		if(err) {return next(err);}
		res.send('OK');
	});
}

// Elimina datos de un herramienta
exports.tool_delete = function(req, res, next) {
	Tool.remove({_id: req.params.id}, {}, function(err) {
		if(err) {return next(err);}
		res.send('OK');
	});
}