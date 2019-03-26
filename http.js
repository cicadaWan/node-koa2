// const http = require('http');
// const server = http.createServer();
// const path = require('path');
// const fs = require('fs');
// const util = require('util');
// // server.on('request', function(req,res) {
// //   console.log(req,res)
// //   res.writeHead(200, {
// //     'Content-Type': 'text/plain',
// //     'Cache-Control': 'max-age=3600'
// //   });
// //   res.setHeader('Content', 'text')
// //   res.write('Hello World!');
// //   // res.end(req.url);
// //   // res.end(util.inspect(req.headers));
// //   res.end('hello word');
// // })
// // server.listen(4000);

// // 构建一个简单的http静态文件服务器
// // require('http').createServer((req,res) => {
// //   const file = path.normalize('.'+req.url);
// //   console.log('Trying to server', file);
// //   function reportError(err) {
// //     console.log(err);
// //     res.writeHead(500);
// //     return res.end('Internal Server Error');
// //   }
// //   path.exists(file, (exists) => {
// //     if(exists) {
// //       fs.stat(file, (err,stat) => {
// //         let rs;
// //         if(err) {
// //           return reportError(err);
// //         }
// //         if (stat.isDirectory()) {
// //           res.writeHead(403);
// //           return res.end('Forbidden');
// //         } else {
// //           rs = fs.createReadStream(file);
// //           rs.on('error', reportError);
// //           res.writeHead(200);
// //           rs.pipe(res);
// //         }
// //       })
// //     } else {
// //       res.writeHead(404);
// //       return res.end('Not found');
// //     }
// //   })
// // }).listen(4000);

// // 使用HTTP分块响应和定时器
// require('http').createServer((req,res) => {
//   res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
//   let left = 10;
//   const interval = setInterval(() => {
//     for(var i = 0; i < 10; i++) {
//       res.write('你是个大傻瓜');
//     }
//     if (-- left == 0) {
//       clearInterval(interval);
//       res.end();
//     }
//   }, 1000)
// }).listen(4000);

// 服务端代码
// var server = require('net').createServer(function(socket){
//   console.log('服务端：收到来自客户端的请求');
//   socket.on('data', function (data) {
//     console.log(`服务端：收到客户端数据，内容为${data}`);
//     // 给客户端返回数据
//     socket.write('你还，我是服务端');
//   });
//   socket.on('close', () => {
//     console.log('服务端：客户端连接断开');
//   })
// });
// server.listen(3001, 'localhost', () => {
//   console.log('服务端：开始监听来自客户端的请求');
//   console.log(server.address());
//   server.close((err) => {
//     if (err) {
//       console.log('服务异常' + err.message)
//     } else {
//       console.log('服务正常关闭')
//     }
//   })
// })
// server.on('close', () => {
//   console.log('close事件：服务端关闭')
// })
