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
          // 新用户进入了
          socket.broadcast.emit('userin', curUser)
        }
      }
    })

    socket.on('users', (token) => {
      let _id = curUser._id
      if (!_id) {
        _id = verifyToken(token)._id
      }
      const arr = users.filter((el) => el._id !== _id)
      socket.emit('users', arr)
    })
    socket.on('disconnect', () => {
      console.log('端开链接')
    })
    socket.on('msg', (data) => {
      socket.emit('msg', { msg: 'server-' + data.msg })
      // socket.send('msg', { msg: 'server-' + data.msg })
    })
  })
}

module.exports = creatSocket
