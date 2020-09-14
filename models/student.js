var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var StudentSchema = new Schema({
	nombre: {type: String, required: true},
	apellido: {type: String, required: true},
	numeroControl: {type: Number, required: true},
	carrera: {type: String, required: true},
	horario: {type: String, required: true},
	correo: {type: String, required: true},
	contrasenia: {type: String, required: true}
});

StudentSchema
.virtual('url')
.get(function() {
	return '/catalogo/estudiante/' + this._id;
});

module.exports = mongoose.model('Student', StudentSchema);