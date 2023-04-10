//호출하는 순서 중요...
//router 정의를 session 정의보다 먼저하면 session을 못읽어오는 오류...

let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
const session = require("express-session");//세선정보를 받을게
const MYSQLSTORE = require("express-mysql-session")(session);//mysql에 세션 정보저장할게. (세션) 보낼거야
const DBInfo = require("./routes/commonDB");//디비정보를 줘야함.

let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');
let boardRouter = require('./routes/board');
let memberRouter = require('./routes/member');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//미들웨어 - 모든 웹상의 요청이 거쳐간다.
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
let sessionStore = new MYSQLSTORE(DBInfo.DBInfo);//commondb를 dbinfo로 불러왔는데 그 안에 있는 dbinfo라는 메소드?를 호출.
app.use(session({
  key : "session_key",
  secret : "ajsdfojpweatpasejgawerg",//아무키나. 암호화할때 쓸거
  store : sessionStore,
  resave : false,
  saveUninitialized : false
}))


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/board', boardRouter);
app.use('/member', memberRouter);


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
