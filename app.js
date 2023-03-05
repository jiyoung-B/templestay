const express = require('express');
const path = require('path');
const {engine} = require('express-handlebars');
const logger = require('morgan');



const app = express();
const port = process.env.PORT || 3001
const indexRouter = require('./routes/index');
app.use('/', indexRouter);

app.engine('hbs', engine({
    extname: '.hbs',
    defaultLayout: 'layout',
    helpers: require('./helpers/handlebars-helper'),
}));
app.set('views', path.join(__dirname, 'views')); // 디렉토리 만들기
app.set('view engine', 'hbs');

app.use(logger('dev'));

app.use((req, res) => {
    res.status(404);
    res.send('404 - 페이지가 없어요!');
});

app.use((err, req, res, next) => {
    console.log(err);
    res.status(500);
    res.send(path.join('500-서버 내부 오류 발생했어요!'));
});

app.listen(port, () => {
    console.log('templeStay 서버 실행중 ...')
})