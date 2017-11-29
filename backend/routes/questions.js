var express = require('express');
var router = express.Router();
var hackerRank = require('machinepack-hackerrank');

let Solution = require('../models/solution');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('questions');
});

router.post('/', function(req, res, next){
  let solution = new Solution();
  solution.name = req.body.name;
  solution.save();
  console.log('ttttttt');
});

router.post('/compile', function(req, res, next) {

hackerRank.submit({
	apiKey: 'hackerrank|3331905-2151|0d0e478819602bfc3889c19c9af0e3135f3bb58d',
	source: req.body.source,
	language: parseInt(req.body.language),
	testcases: JSON.parse(req.body.input),
	wait: true,
	callbackUrl: '',
	format: 'json',
	}).exec({
// An unexpected error occurred.
	error: function (err) {
		throw err;
	},
// OK.
	success: function (response) {
 	console.log(response)
	 res.json(response);
	},
	});

});

router.get('/changelang/:langCode/:language', function(req, res, next) {
var language = req.params.language.trim();
var langCode = req.params.langCode.trim();

res.render('questions',{language:language,langCode:langCode});

});



module.exports = router;
