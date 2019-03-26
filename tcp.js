var net = require('net');
var server = net.createServer();
//将所有连接存入某个位置，向所有客户端广播用户数据
 var sockets = [];
server.on('connection', (socket) => {
  console.log('建立一个新的连接')
  sockets.push(socket);
  // 从连接中读取数据
  socket.on('data', (data) => {
    console.log(`得到数据${data}`);
    // 每当一个已经连接的用户输入数据，就应该将数据广播给所有其他已经连接的用户
    sockets.forEach((otherSocket) => {
      if (otherSocket !== socket) {
        otherSocket.write(data)
      }
    })
  });
  // 连接被关闭时删除
  socket.on('close', () => {
    console.log('连接关闭');
    const index = sockets.indexOf(socket);
    sockets.splice(index,1);
  })
});

server.on('error', function(err) {
  console.log('Server error:', err.message);
});

server.on('close', function() {
  console.log('Server closed');
  
})
server.listen(4001);





// var net = require('net');
// // tcp客户端
// var client = net.createConnection(3001, 'localhost');
// client.on('connect', () => {
//   console.log('客户端：已经与服务端建立链接');
// });
// client.on('data', (data) => {
//   console.log(`收到服务端数据${data}`)
// });
// client.on('close', () => {
//   console.log('客户端：链接断开')
// });
// client.end('你好，我是客户端');
