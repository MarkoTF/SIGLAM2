var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var LendSchema = new Schema({
	estudiante: {type: Schema.Types.ObjectId, ref: 'Student', required: true},
	maestro: {type: Schema.Types.ObjectId, ref: 'Teacher', required: true},
	trabajador: {type: Schema.Types.ObjectId, ref: 'Worker', required: false},
	herramientas: [{type: Schema.Types.ObjectId, ref: 'Tool', required: true}],
	fecha: {type: Date, required: true}
});

LendSchema
.virtual('url')
.get(function() {
	return '/catalogo/prestamo/' + this._id;
});

module.exports = mongoose.model('Lend', LendSchema);