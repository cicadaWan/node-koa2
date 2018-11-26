const koa = require('koa');
const app = new koa();
const logger = require('koa-logger');
const static = require('koa-static');
const path = require('path');
// todo:中间件处理提交的数据 
const bodyParser = require('koa-bodyparser')
// 添加路由
// const Router = require('koa-router')
const router = require('./router/index');
const cors = require('koa2-cors');

// todo:单独写一个文件里
// router.get('/', async(ctx, next) => {
//   ctx.body = '这是首页';
// })
// router.get('/user', async(ctx, next) => {
//   ctx.body = '这是user页';
// })
// router.get('/post', async(ctx, next) => {
//   ctx.body = ctx.request.body;
// })
// router.get('/async', async ctx => {
//   const sleep = async (ms) => {
//     return new Promise (resolve => {
//       console.log(resolve)
//       setTimeout(() => {
//         resolve(true)
//       }, ms)
//     })
//   }
//   await sleep(1000)
//   ctx.body = '异步处理页'
// })




// todo:跨域处理要放在第一位
app
  .use(logger())
  .use(cors())
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods())
// 静态文件存放地址
const staticPath = './static';
// app.use(async (ctx) => {
//   ctx.body = 'hello world'
// })
// app.use(require('./router/index'));
// // 静态文件 koa-static的放置
// app.use(static(
//   path.join(__dirname, staticPath)
// ))
app.listen(3001, () => {
  console.log(`服务器已经启动你看到没有：location:3001`)
})