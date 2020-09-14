var createError = require('http-errors');
var express = require('express');
var path = require('path');
//var cookieParser = require('cookie-parser');
var logger = require('morgan');
var debug = require('debug')('siglam:db');

var usuarios = require('./routes/users');
var catalogo = require('./routes/catalogo');

var app = express();

//Conexión a la base de datos
var mongoose = require('mongoose');
var mongoDb = 'mongodb://localhost:27017/siglam';
mongoose.connect(mongoDb, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error en la Conexión a la base de datos:'));
db.once('open', function() {
  debug('Conexión exitosa a la base de datos');
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

//Rutas
app.use('/catalogo', catalogo);
app.use('/usuarios', usuarios);

// Captura al error 404 y lo envía al manejador de errores
app.use(function(req, res, next) {
	next(createError(404));
});

//Manejador de errores
app.use(function(err, req, res, next) {
	//Establece locales, solamente proporcionando error en el desarrollo
	res.locales.message = err.message;
	res.locales.error = req.app.get('env') === 'development' ? err : {};

	// Renderiza la página de error
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;