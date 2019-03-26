/**
 * demo1:koa2中原生cookie操作
 */
// const Koa = require('koa');
// const app = new Koa();

// app.use( async (ctx) => {
//   if (ctx.url === '/index') {
//     ctx.cookies.set(
//       'cid',
//       'hello world',
//       {
//         domain: 'localhost',
//         path: '/index',
//         maxAge: 10*60*1000,
//         httpOnly: false,
//         overwrite: false,
//       }
//     )
//       ctx.body = 'cookies is ok'
//   } else {
//     ctx.body = 'hello world'
//   }
// })
// app.listen(3002, () => {
//   console.log('cookie已经种下')
// })
/**
 * demo2:koa2实现session操作
 */
const Koa = require('koa')
const session = require('koa-session-minimal')
const MysqlSession = require('koa-mysql-session')

const app = new Koa()
// 配置存储session信息的mysql
let store = new MysqlSession({
  host: 'localhost',
  user: 'root',
  password: '0203lanlan', //自己配置的sql的密码名
  database: 'REACT_KOA_NODE', //MySQL表名
})

// 存放session的cookie配置
let cookie = {
  maxAge: '', //cookie有效时长
  httpOnly: false,
  overwrite: false,
}
// 使用session中间件
app.use(session({
  key: 'SESSION_ID',
  store: store,
  cookie: cookie
}))
app.use( async ( ctx ) => {
  console.log(ctx, 'ctx是')
  // 设置session
  if (ctx.url === '/set') {
    ctx.session = {
      user_id: Math.random().toString(36).substr(2),
      count: 0
    }
    // ctx.body = ctx.session
  } else if ( ctx.url === '/') {
    // 读取session信息
    ctx.session.count = ctx.session.count + 1
    ctx.body = ctx.session
  }
})
app.listen(3002, () => {
  console.log('session在')
})