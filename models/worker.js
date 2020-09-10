var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var WorkerSchema = new Schema({
	nombre: {type: String, required: true},
	apellido: {type: String, required: true},
	identificacion: {type: Number, required: true},
	horario: {type: String, required: true}
});

WorkerSchema
.virtual('url')
.get(function() {
	return '/catalogo/worker/' + this._id;
});

module.exports = mongoose.model('Worker', WorkerSchema);