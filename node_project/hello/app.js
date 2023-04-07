var createError = require('http-errors');//http 에러처리를 위한 라이브러리. 404오류 반환 등
var express = require('express');//라우팅, 미들웨어, 요청 및 응답객체 등 처리
var path = require('path');//파일경로를 찾거나 조작할 때 사용.
var cookieParser = require('cookie-parser');//로그인 정보를 쿠키에 저장, 처리 등
var logger = require('morgan');//이벤트 추적 및 분석. 로그 기록.

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var guestRouter = require('./routes/guestbook');//모듈을 메모리로 가져온다.
var ajaxRouter = require('./routes/ajaxtest');
//라우팅 : 어떤 요청이 어떤 코드로 처리될 지 결정하는 것.
var app = express();

// view engine setup(내부 환경변수 설정)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//미들웨어를 사용
app.use(logger('dev'));//dev모드에서는 메소드, url, 응답코드, 시간 등 정보가 로그로 출력.
app.use(express.json());//JSON형식의 본문을 파싱하기 위한 미들웨어. req.body에 정보저장
app.use(express.urlencoded({ extended: false }));//form data를 파싱하기 위한 미들웨어. req.body에 저장. 인코딩 false는 기본방식
app.use(cookieParser());//req.cookies에 쿠키파싱결과 저장.
//static - image, css, js
//nodejs가 __(언더바 두개)로 시작하는 변수나 함수는 내장 변수나 함수다.
//__dirname : 내장변수, 현재 디렉토리 경로를 갖고 있다.
//path.join : path - 전체 디렉토리 경로에 대한 관리를 도와준다.
//join 합친다.path.join(__dirname, 'public') c:/temp/public형태로 전체 경로를 만들어 준다.
// 역슬래쉬로 경로를 나타내려면 \\로 두개 써야한다. (이스케이프문자)\

console.log(__dirname);
console.log(path.join(__dirname, 'public'));//path끝에 public만 붙여줌.

app.use(express.static(path.join(__dirname, 'public')));//정적파일 제공을 위한 미들웨어
//정적파일은 public파일 안에 있는 요소들이며, html, css, js, 이미지, 폰트 등 파일이 위치.
app.use('/', indexRouter);
app.use('/users', usersRouter);// /users로 시작하는 url에 대한 처리를 위한 미들웨어
//url이 guestbook으로 시작할 경우 guestRouter가 처리한다.
app.use('/guestbook', guestRouter);
app.use('/ajax', ajaxRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
//이전에 등록된 모든 라우팅에서 요청을 처리할 수 없을 경우 호출.
//404에러를 생성하고 에러 핸들러로 요청을 전달. 에러 핸들러는 바로 아래 미들웨어 함수임.
//createError는 위에서 http-errors를 불러와서 이용한 것.

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  //res.locals은 res객체의 속성으로 뷰 엔진에서 사용할 수 있는 로컬변수를 지정하는데 사용.
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  //에러 메세지와 환경변수를 가져와서 뷰 엔진에서 사용할 수 있도록 지정.
  //env는 현재 실행환경을 가져온다. 그리고 환경변수가 devel..인경우 에러를 노출한다.
  
  // render the error page
  res.status(err.status || 500);
  //err.은 이전 미들웨어에서 발생한 객체를 전달받는다. 전달받은 객체가 없으면 기본값으로 500을 설정.
  res.render('error');
  //error파일을 렌더링.
});

module.exports = app;

//npm install -g nodemon
//npm install nodemon //양쪽으로 깔아줘야함.
//nodoemon start로 실행시키기.