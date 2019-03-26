const Router = require('koa-router');
const router = new Router;

const profile = require('../controller/profile');
const register = require('../controller/register');

// todo:用use的写法是为了定义好按照接口来划分可能说这个接口里面有多种方法，就写一起
// todo: 当请求路径匹配到了/test才会执行allowedMethods,然后根据ctx.status设置response响应头
router
  .use('/user/profile', profile.routes(), profile.allowedMethods())
  .use('/user/register', register.routes(), profile.allowedMethods())
  
module.exports = router