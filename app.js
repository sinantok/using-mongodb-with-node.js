const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

//routing'ler dahil edildi
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const booksRouter = require('./routes/books');

const app = express();
//mongoDbye bağlanmak icin yöntem 1
/*mongoose.connect('mongodb://localhost:27017/mongooseFirst',{useNewUrlParser: true})
  .then(()=>{
    console.log("db baglandı");
  })
  .catch((err) => {
    console.log(err);
  });*/
//mongoDbye bağlanmak icin yöntem 2
mongoose.connect('mongodb://localhost:27017/mongooseFirst',{useNewUrlParser: true});
mongoose.connection.on('open', () => {
  console.log("connected");
});
mongoose.connection.on('error', (err) => {
  console.log("connection error", err);
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//route ayarları
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/books', booksRouter);

// 404 hatası varsa yakala ve istemciye ilet
app.use(function(req, res, next) {
  next(createError(404));
});

// hatalar
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
