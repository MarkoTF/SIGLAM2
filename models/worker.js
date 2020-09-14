var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var WorkerSchema = new Schema({
	nombre: {type: String, required: true},
	apellido: {type: String, required: true},
	identificacion: {type: Number, required: true},
	horario: {type: String, required: true},
	correo: {type: String, required: true},
	contrasenia: {type: String, required: true}
});

WorkerSchema
.virtual('url')
.get(function() {
	return '/catalogo/trabajador/' + this._id;
});

module.exports = mongoose.model('Worker', WorkerSchema);