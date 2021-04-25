const IO = require('socket.io')
const { verifyToken } = require('../utils/jwt')

const creatSocket = (server) => {
  const io = IO(server, {
    cors: {
      origin: '*'
    }
  })

  let users = []

  io.on('connection', (socket) => {
    // socket.send('hi', 'server api')
    // console.log('已连接')

    let curUser = {}

    socket.on('login', (data) => {
      const result = verifyToken(data.token)
      if (result) {
        const { _id } = result // 用户 token --> _id
        if (users.findIndex((el) => el._id === _id) === -1) {
          // 确保当前用户唯一
          const tempUser = { _id, ...data.userInfo }
          users.push({ ...tempUser })
          curUser = { ...tempUser }
        }
      }
    })

    socket.on('users', () => {
      const arr = users.filter((el) => el._id !== curUser._id)
      socket.emit('users', arr)
    })

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
