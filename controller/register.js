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
function handleLogin(data) {
  return new Promise(function(resolve, reject) {
    // todo: 利用用户名来查找，能够找到用户名的时候result不为空返回的是表里的用户名和密码，找不到的时候result为空
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
    await handleLogin(param).then((result) => {
      // todo: result:[]用户不存在
      if (result.length === 0) {
        ctx.body = {
          flag: 0,
          message: '当前用户不存在，请先注册'
        }
      } else {
        // todo: 比对表里的名称和密码，看是否一致
        if (result.name !== param.name || result.pass !== param.pass) {
          ctx.body = {
            flag: 0,
            message: '用户名或者密码有误，请重新输入！',
          }
        } else {
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
module.exports = register;
