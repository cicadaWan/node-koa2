const sleep = async (ms) => {
  return new Promise(resolve => {
    console.log(resolve,'reeee')
    setTimeout(() => {
      resolve(true)
    }, ms)
  })
}
module.exports = {
  login(ctx) {
    ctx.body = {
      username: ctx.request.body.username
    }
  },
  async profile(ctx) {
    // await sleep(1000)
    ctx.body = {
      list: [
        { "id": 120, "companyId": 7703522, "companyName": "英仕互联(北京)信息技术有限公司", "createtime": "2018-08-30 21", "timeDescr": "2018-08-31 04~2018-08-31 20", "imgId": "5b87ea3be4b02248e7c37a2901a.png" },
        { "id": 119, "companyId": 7703522, "companyName": "英仕互联(北京)信息技术有限公司", "createtime": "2018-08-30 20", "timeDescr": "2018-08-29 20~2018-08-31 20", "imgId": "5b87e9a1e4b02248e7c37a1a01a.png" },
        { "id": 118, "companyId": 7703522, "companyName": "英仕互联(北京)信息技术有限公司", "createtime": "2018-08-30 19", "timeDescr": "2018-08-31 03~2018-08-31 19", "imgId": "5b87d7ede4b02248e7c379a501a.png" },
        { "id": 117, "companyId": 7702544, "companyName": "技术部测试猎币转移置换啥啥啥", "createtime": "2018-08-30 19", "timeDescr": "2018-08-31 03~2018-09-01 19", "imgId": "5b87d79ce4b02248e7c3799901a.png" },
        { "id": 116, "companyId": 7701577, "companyName": "技术部测试各种标签客户三急聘", "createtime": "2018-08-30 19", "timeDescr": "2018-08-31 03~2018-09-01 19", "imgId": "5b87d79ce4b02248e7c3799901a.png" },
        { "id": 115, "companyId": 7702544, "companyName": "技术部测试猎币转移置换啥啥啥", "createtime": "2018-08-30 19", "timeDescr": "2018-08-29 19~2018-08-31 19", "imgId": "5b87d761e4b02248e7c3798a01a.png" },
        { "id": 114, "companyId": 7701577, "companyName": "技术部测试各种标签客户三急聘", "createtime": "2018-08-30 19", "timeDescr": "2018-08-29 19~2018-08-31 19", "imgId": "5b87d761e4b02248e7c3798a01a.png" },
        { "id": 113, "companyId": 7702544, "companyName": "技术部测试猎币转移置换啥啥啥", "createtime": "2018-08-30 19", "timeDescr": "2018-08-31 03~2018-08-31 19", "imgId": "5b87d72fe4b02248e7c3798101a.png" },
        { "id": 112, "companyId": 7701577, "companyName": "技术部测试各种标签客户三急聘", "createtime": "2018-08-30 19", "timeDescr": "2018-08-31 03~2018-08-31 19", "imgId": "5b87d72fe4b02248e7c3798101a.png" },
        { "id": 111, "companyId": 7703522, "companyName": "英仕互联(北京)信息技术有限公司", "createtime": "2018-08-30 19", "timeDescr": "2018-08-05 19~2018-08-31 19", "imgId": "5b87d413e4b02248e7c3793602c.png" }]
    }
  },
  async shuju(ctx) {
     
  }
}