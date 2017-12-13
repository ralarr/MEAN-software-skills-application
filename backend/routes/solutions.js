var express = require('express');
var router = express.Router();
const mongojs = require('mongojs');
var db = mongojs('dbone', ['solutions']);

router.get('/', function(req, res){
  db.solutions.find(function(err, docs){
    if (err){
      console.log(err);
    } else {
      res.render('solutions.ejs', {pageTitle: "Solutions", solutions: docs});
    }
  });
});

/*router.get('/', function(req, res, next){
  res.render('solutions', { name: 'Solutions'});
});*/

/*router.get('/.html', function(req, res){
  db.solutions.find(function(err, docs){
    if (err){
      console.log(err);
    } else {
      //res.json({ name: 'Data', 'mydata': docs });
      //res.send('<strong>'docs'</strong>');
      //res.render('solutions', { title: 'Solutions', data: JSON.stringify(docs[0]) });
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(docs));
    }
  });
});
*/

/*router.get('/', function (req, res, next) {

  db.solutions.find(function (err, docs) {
    res.send(docs);
  });
});*/

/*router.get('/', function(req, res) {
  res.render('solutions');
});*/

module.exports = router;
