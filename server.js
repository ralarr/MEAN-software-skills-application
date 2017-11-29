const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');
var logger = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
var router = express.Router();
var appRoutes = require('./backend/routes/api')(router);
var questions = require('./backend/routes/questions');

app.set('views', path.join(__dirname, 'frontend/app/views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// middlewares
//app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/frontend'));


app.use('/api', appRoutes);
app.use('/questions', questions);

// catch 404 and forward to error handler
/*app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});*/

// connect to the database
mongoose.connect('mongodb://localhost:27017/dbone', (err) => {
	if (err){
		console.log('Connection to MongoDB UNSUCCESSFUL');
	} else {
		console.log('Connection to MongoDB SUCCESSFUL');
	}
});

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname + '/frontend/app/views/index.html'));
});

app.listen(port, () => {
	console.log("Server started on port " + port);
});

//module.exports = app;
