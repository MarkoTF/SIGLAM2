var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CategorySchema = new Schema({
	nombre: {type: String, required: true}
});

CategorySchema
.virtual('url')
.get(function() {
	return '/catalogo/categoria/' + this._id;
});

module.exports = mongoose.model('Category', CategorySchema);