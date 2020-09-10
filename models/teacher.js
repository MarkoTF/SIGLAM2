var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var TeacherSchema = new Schema({
	nombre: {type: String, required: true},
	apellido: {type: String, required: true},
	identificacion: {type: Number, required: true},
	carrera: {type: String, required: true},
	horario: {type: String, required: true}
});

TeacherSchema
.virtual('url')
.get(function() {
	return '/catalogo/maestro/' + this._id;
});

module.exports = mongoose.model('Teacher', TeacherSchema);