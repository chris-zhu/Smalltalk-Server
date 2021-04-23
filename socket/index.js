const IO = require('socket.io')

const creatSocket = (server) => {
  const io = IO(server, {
    cors: {
      origin: '*'
    }
  })
  io.on('connection', (socket) => {
    socket.send('hi', 'server api')
    console.log('已连接')
    // console.log(Object.keys(socket));
    let handshake = socket.handshake
    // console.log(handshake)
    socket.on('disconnect', () => {
      console.log('端开链接')
    })
    socket.on('msg', (data) => {
      console.log(data)
      socket.emit('msg', { msg: 'server-' + data.msg })
      // socket.send('msg', { msg: 'server-' + data.msg })
    })
  })
}

module.exports = creatSocket
