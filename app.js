var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
const morgan = require('morgan');
var bodyParser = require('body-parser');
const cors = require('cors')
require('dotenv').config();


var app = express();

let port = process.env.PORT || 3000
app.listen(port)

var footballRouter = require('./routes/football')
var weatherRouter = require('./routes/weather')

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// app.use('y', express.static('uploads'));


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/football', footballRouter)
app.use('/weather', weatherRouter)

app.get('/', (req, res) => {
  res.send('Hello')
})

app.use((req, res, next) =>{
  // right now access is for everyone *
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With , Content-Typer, Accept Autorization' 
  );
  if (req.method === 'OPTIONS') {
    res.header('Access-Cotril-Allow-Methods' , 'PUT, POST , PATCH , DELETE , GET');
    return res.status(200).json({});
  }
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});



// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;
