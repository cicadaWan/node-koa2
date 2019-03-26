const Router = require('koa-router');
const register = new Router;
const db = require('../db');

function handleRegister(data) {
  return new Promise(function(resolve, reject) {
    // todo: 建立表格的时候，PRIMARY KEY (name)，name唯一性
    db.query('INSERT INTO users SET name=?, pass=?', [data.name, data.password], async function(err,result) {
      if(err) {
        reject()
      } else {
        resolve(result)
      }
    })
  })
}
function handleLogout(data) {
  return new Promise(function(resolve,reject) {
    db.query(`SELECT * FROM users WHERE name='${data}';`, async function(err,result) {
      if (err) {
        reject()
      } else {
        resolve(result)
      }
    })
  })
}
function handleLogin(data) {
  return new Promise(function(resolve, reject) {
    db.query(`SELECT * FROM users WHERE name='${data.name}';`, async function(err, result) {
      if (err) {
        reject()
      } else {
        console.log(result, 1111)
        resolve(result)
      }
    })
  })
}

register
  .put('/', async(ctx) => {
    const data= ctx.request.body;
    console.log(data, 'data是');
    await handleRegister(data).then((result) => {
      ctx.body = {
        flag: 1,
        message: '注册成功',
      }

    }).catch(() => {
      ctx.body = {
        flag: 0,
        message: '当前用户已存在，请勿重复注册',
      }
    })
  })
  .get('/', async(ctx) => {
    const param = ctx.query;
    console.log(param,  'param是');
    await handleLogin(param).then((data) => {
      // TODO：处理下RowDataPacket；
      let result = JSON.stringify(data);
      result = JSON.parse(result);
      console.log(result[0], 'result是')
      console.log(ctx.session.user, 'ctx.session.user是')
      
      // todo: result:[]用户不存在
      if (result[0].length === 0) {
        ctx.body = {
          flag: 0,
          message: '当前用户不存在，请先注册'
        }
      } else {
        // todo: 比对表里的名称和密码，看是否一致
        console.log(ctx.session, 99991);
        console.log(result[0].name,param.name, result[0].pass, param.pass,999)
        if (ctx.session.user && ctx.session.user.name === result[0].name) {
          ctx.body = {
            flag: 0,
            message: `亲爱的${ctx.session.user.name}您已登录过，请勿重新登录哦`
          }
        } else if (result[0].name !== param.name || result[0].pass !== param.pass) {
          ctx.body = {
            flag: 0,
            message: '用户名或者密码有误，请重新输入！',
          }
        } else {
          ctx.session.user = {
            name: '陈一一',
          }
          // 保存登录状态
          ctx.body = {
            flag: 1,
            message: '登录成功',
          }
        }
      }
      }).catch(() => {
        ctx.body = {
          flag: 0,
          message: '系统错误，请稍候再试',
        }
      })
  })
  .delete('/:name', async(ctx) => {
    console.log(ctx.params.name, 'loginout的ctx是')
    await handleLogout(ctx.params.name).then((data) => {
      console.log(data,'退出以后的data是')
      ctx.session = null;
      ctx.body = {
        flag: 1,
        message: '你已退出登录'
      }
    }).catch(() => {
      ctx.body = {
        flag: 0,
        message: '系统错误，请稍后再试',
      }
    })
  })
module.exports = register;
