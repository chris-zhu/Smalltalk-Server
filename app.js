const {
  app,
  server,
  port,
  router,
  creatSocket,
  bodyParser,
  xmlParser,
  cors,
  static,
  dbConnect,
  error
} = require('./utils/init')
dbConnect()

app.use(error)
app.use(xmlParser())
app.use(bodyParser())
app.use(cors())
app.use(router.routes()).use(router.allowedMethods())

creatSocket(server)
server.listen(port, () => {
  console.log(
    'server listening on' + '\033[33m http://localhost:' + port + '\033[0m'
  )
})
