const Koa = require('koa');
const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');
const app = new Koa();
app.use(bodyParser());

// router.get('/', async(ctx,next) => {
//   ctx.response.body = `<h1>ctx</h1>`
// })
// router.get('/home', async(ctx,next) => {
//   ctx.response.body = `<h1>123</h1>`
//   // 访问http://localhost:9001/home?id=12&kind=1
//   // ctx.request.query的值为{ id: 12, kind: 1};
//   // ctx.request.querystring的值为id=12&kind=1;
//   console.log(ctx.request.query, '123');
//   console.log(ctx.request.querystring, 22);
// })
// router.get('/home/:id/:kind', async(ctx, next) => {
//   ctx.response.body = `<h1>123</h1>`
//   // 访问http://localhost:9001/home/122/1
//   console.log(ctx.params, 888); // { id: '122', kind: '1'}
// })
router.get('/user', async(ctx, next) => {
  ctx.response.body = `
    <form action="/user/register" method="post">
    <input name="name" type="text" placeholder="666" />
    <input name="password" type="text" placeholder="123" />
    <button>点击</button>
    </form>
  `
})
router.post('/user/register', async(ctx, next) => {
  ctx.response.body = `<h1>123</h1>`;
  console.log(ctx.request.body, '111') // { name: '666', password: '123' }
  const { name, password } = ctx.request.body;
  if (name === '666' && password === '123') {
    ctx.body = `<h1>名称是${name},密码是${password}</h1>`
  } else {
    ctx.body = '错啦'
  }
})

app
  .use(router.routes());

app.listen('9001', () => {
  console.log('11')
})