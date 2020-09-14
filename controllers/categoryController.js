var Category = require('../models/category');
//var async = require('async');

// Manda los datos de todos los categorias
exports.category_list = function(req, res, next) {
	Category.find()
	.exec(function(err, results) {
		if(err) {return next(err); }
		if(results == null) {
			res.format({
				'application/json' : function() {
					res.send({});
				}
			});
		}

		res.send(results);
	});
}

// Manda los datos de un solo categoría
exports.category_details = function(req, res, next) {
	Category.findById(req.params.id).exec(function(err, result) {
		if(err) {return next(err); }
		if(result == null) {
			res.format({
				'application/json' : function() {
					res.send({});
				}
			});
		}

		res.send(result);
	});
}

// Crea un nuevo categoría
exports.category_create = function(req, res, next) {
	category = new Category({
		nombre: req.body.nombre
	});

	category.save(function(err) {
		if(err) { 
			res.send('ERROR: ' + err);
			return next(err); 
		}
		//Sin error
		res.send('OK');
	});
}

// Actuliza datos de un categoría
exports.category_update = function(req, res, next) {
	category = {
		nombre: req.body.nombre
	};

	Category.where({_id: req.params.id}).update({}, category, function(err) {
		if(err) {return next(err);}
		res.send('OK');
	});
}

// Elimina datos de un categoría
exports.category_delete = function(req, res, next) {
	Category.remove({_id: req.params.id}, {}, function(err) {
		if(err) {return next(err);}
		res.send('OK');
	});
}