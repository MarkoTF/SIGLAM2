var mongoose  = require('mongoose');

var Schema = mongoose.Schema;

var ToolSchema = new Schema({
	nombre: {type: String, required: true},
	modelo: {type: String, required: true},
	descripcion: {type: String, required: true},
	categoria: {type: Schema.Types.ObjectId, ref: 'Category' required: true},
	cantidad: {type: Number, required: true},
});

//Url virtual
ToolSchema
.virtual('url')
.get(function() {
	return '/catalogo/tool/' + this._id;
})

module.exports = mongoose.model('Tool', ToolSchema);