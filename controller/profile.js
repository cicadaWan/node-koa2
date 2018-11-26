  const Router = require('koa-router');
  const handleList = new Router;
  const db = require('../db');
  
  // let arr = [
  //   { "id": 0, "companyId": 7703522, "companyName": "英仕互联(北京)信息技术有限公司", "createtime": "2018-08-30 21", "timeDescr": "2018-08-31 04~2018-08-31 20", "imgId": "5b87ea3be4b02248e7c37a2901a.png" },
  //   { "id": 1, "companyId": 7703522, "companyName": "英仕互联(北京)信息技术有限公司", "createtime": "2018-08-30 20", "timeDescr": "2018-08-29 20~2018-08-31 20", "imgId": "5b87e9a1e4b02248e7c37a1a01a.png" },
  //   { "id": 2, "companyId": 7703522, "companyName": "英仕互联(北京)信息技术有限公司", "createtime": "2018-08-30 19", "timeDescr": "2018-08-31 03~2018-08-31 19", "imgId": "5b87d7ede4b02248e7c379a501a.png" },
  //   { "id": 3, "companyId": 7702544, "companyName": "技术部测试猎币转移置换啥啥啥", "createtime": "2018-08-30 19", "timeDescr": "2018-08-31 03~2018-09-01 19", "imgId": "5b87d79ce4b02248e7c3799901a.png" },
  //   { "id": 4, "companyId": 7701577, "companyName": "技术部测试各种标签客户三急聘", "createtime": "2018-08-30 19", "timeDescr": "2018-08-31 03~2018-09-01 19", "imgId": "5b87d79ce4b02248e7c3799901a.png" },
  //   { "id": 5, "companyId": 7702544, "companyName": "技术部测试猎币转移置换啥啥啥", "createtime": "2018-08-30 19", "timeDescr": "2018-08-29 19~2018-08-31 19", "imgId": "5b87d761e4b02248e7c3798a01a.png" },
  //   { "id": 6, "companyId": 7701577, "companyName": "技术部测试各种标签客户三急聘", "createtime": "2018-08-30 19", "timeDescr": "2018-08-29 19~2018-08-31 19", "imgId": "5b87d761e4b02248e7c3798a01a.png" },
  //   { "id": 7, "companyId": 7702544, "companyName": "技术部测试猎币转移置换啥啥啥", "createtime": "2018-08-30 19", "timeDescr": "2018-08-31 03~2018-08-31 19", "imgId": "5b87d72fe4b02248e7c3798101a.png" },
  //   { "id": 8, "companyId": 7701577, "companyName": "技术部测试各种标签客户三急聘", "createtime": "2018-08-30 19", "timeDescr": "2018-08-31 03~2018-08-31 19", "imgId": "5b87d72fe4b02248e7c3798101a.png" },
  //   { "id": 9, "companyId": 7703522, "companyName": "英仕互联(北京)信息技术有限公司", "createtime": "2018-08-30 19", "timeDescr": "2018-08-05 19~2018-08-31 19", "imgId": "5b87d413e4b02248e7c3793602c.png" }
  // ]

  function searchData(id) {
    const param = id === '99999' ? 'SELECT * FROM componey;' : `SELECT * FROM componey WHERE id=${id};`;
    return new Promise(function(resolve, reject) {
      db.query(param, async function(err, result) {
        if(err) {
          reject();
        } else {
          resolve(result);
        }
      })
    })
  }
  function handleDelete(id) {
    return new Promise(function(resolve, reject){
      db.query(`DELETE FROM componey where id=${id};`, async function(err,result) {
        if(err) {
          reject();
        } else {
          resolve(result);
        }
      })
    })
  }
  function handleAdd(data) {
    return new Promise(function(resolve, reject) {
      db.query('INSERT INTO componey SET compName=?', [data], async function(err,result) {
        if(err) {
          reject()
        } else {
          resolve(result)
        }
      })
    })
  }
  function handleUpdate(data) {
    return new Promise(function(resolve, reject) {
      db.query(`UPDATE componey SET compName=? WHERE id=${data.id};`, [data.compName], async function(err, result) {
        if(err) {
          reject();
        } else {
          resolve(result)
        }
      })
    })
  }

  handleList
  // todo: 模拟数据时候使用的
  //    .get('/:id', (ctx) => {
  //     if (ctx.params.id === 'undefined') {
  //       ctx.body = arr
  //     } else {
  //     let id = parseInt(ctx.params.id);
  //     if (id>arr.length) {
  //         ctx.body = []
  //     } else {
  //     let array = []
  //     array.push(arr[id])
  //     ctx.body = array
  //     }
      
  //   }
  // }) 
  .get('/:id', async (ctx, next) => {
    console.log(ctx, 'ctx是');
    const id = ctx.params.id;
    console.log(id,'querys')
    ctx.response.type = 'json';
    ctx.status = 200;
    let resBody = {

    };
    if (id) {
      await searchData(id).then((result) => {
        resBody = {
          flag: 1,
          data: result,
        }
      }, () => {
        resBody = {
          flag: 0,
          data: '系统错误',
        }
      })
    }
    ctx.body = JSON.stringify(resBody);
  })
  .delete('/:id', async (ctx) => {
    // 模拟数据时候调用
    // let id = parseInt(ctx.params.id);
    // console.log(id)
    // const index = arr.findIndex((item) => item.id === id);
    // arr.splice(index, 1);
    // console.log(arr);
    // ctx.status = 200;
    // ctx.body = {flag: 1};
    const id = ctx.params.id;
    console.log(id, 'id是')
    await handleDelete(id).then((result) => {
      console.log(result, 'result是')
      ctx.body = {
        flag: 1,
      }
    }).catch(() => {
      ctx.body = {
        flag: 0,
      }
    })
  })
  .put('/:id', async(ctx) => {
    console.log(ctx);
    const id = ctx.params.id;
    console.log(id, 'id是');
    await handleAdd(id).then((result) => {
      ctx.body = {
        flag: 1,
      }
    }).catch(() => {
      ctx.body = {
        flag: 0,
      }
    })
  })
  .post('/', async(ctx) => {
    console.log(ctx.request.body, 111111);
    const data = ctx.request.body;
    await handleUpdate(data).then((result) => {
      ctx.body = {
        flag: 1,
      }
    }).catch(() => {
      ctx.body = {
        flag: 0,
      }
    })
  })
module.exports = handleList;
