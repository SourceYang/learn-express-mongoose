var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var AuthorSchema = new Schema(
  {
    first_name: { type: String, required: true, maxLength: 100 },
    family_name: { type: String, required: true, maxLength: 100 },
    date_of_birth: { type: Date },
    date_of_death: { type: Date },
  }
);

// Virtual for author's full name
AuthorSchema
.virtual('name')
.get(function () {
  var fullname = '';
  if (this.first_name && this.family_name) {
    fullname = this.family_name + ', ' + this.first_name;
  }
  return fullname;
});

// Virtual for author's lifespan
AuthorSchema
.virtual('lifespan')
.get(function () {
  var birth = this.date_of_birth ? this.date_of_birth.getFullYear().toString() : '';
  var death = this.date_of_death ? this.date_of_death.getFullYear().toString() : '';
  return birth + ' – ' + (death ? death : '');
});

//Export model
module.exports = mongoose.model('Author', AuthorSchema);
