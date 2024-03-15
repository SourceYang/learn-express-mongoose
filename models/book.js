var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var BookSchema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'Author', required: true },
    summary: { type: String, required: true },
    ISBN: { type: String, required: true },
    genre: [{ type: Schema.Types.ObjectId, ref: 'Genre' }],
    url: { type: String, required: true }
  }
);

BookSchema
.virtual('url')
.get(function () {
  return '/catalog/book/' + this._id;
});

//Export model
module.exports = mongoose.model('Book', BookSchema);
