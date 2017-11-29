let mongoose = require('mongoose');

let solutionSchema = mongoose.Schema({
	name: { type: String, required: true }
});

let Solution = module.exports = mongoose.model('Solution', solutionSchema);
