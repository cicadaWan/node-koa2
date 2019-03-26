const koa = require('koa');
const app = new koa();
// const logger = require('koa-logger');
const fs = require('fs');
const child_process = require('child_process');
const exec = child_process.exec;
exec('ls', function(err,stdout, stderr) {
  // console.log(stdout, 'stdout是');
})

// 打开文件
fs.open('./db.js', 'r', (err, fd) => {
  // 获取文件描述符
  console.log(fd, '获取文件描述符');
})

// todo:中间件处理提交的数据 
const bodyParser = require('koa-bodyparser')
// 添加路由
const router = require('./router/index');
const cors = require('koa2-cors');

// todo: 利用koa的session
const session = require('koa-session-minimal') // 处理数据库的中间件
const MysqlSession = require('koa-mysql-session') //处理数据库的中间件
// 配置存储session信息的mysql
let store = new MysqlSession({
  host: 'localhost',
  user: 'root',
  password: '0203lanlan',
  database: 'REACT_KOA_NODE',
})
// 存放session的cookie配置
let cookie = {
  maxAge: '', //cookie有效时长
  httpOnly: false,
  overwrite: false,
}


// todo:跨域处理要放在第一位
app
  // .use(logger())
  .use(cors({
    // todo:设置这个，解决访问时候跨域问题
    origin: 'http://localhost:1212',
    credentials: true,
  }))
  .use(session({
    key: 'USER_NAME',
    store: store,
    cookie: cookie
  }))
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods())
  
// 静态文件存放地址
const staticPath = './static';

app.listen(3001, () => {
  console.log(`服务器已经启动你看到没有：location:3001`)
})