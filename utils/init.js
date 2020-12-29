const Koa = require('koa')
const app = new Koa()
const server = require('http').createServer(app.callback())
const router = require('../routes')
const port = 9999
const creatSocket = require('../socket')
const bodyParser = require('koa-bodyparser')
const xmlParser = require('koa-xml-body')
const cors = require('koa2-cors')
const { Connect } = require('../config/db')
const { error } = require('../middleware/result')

module.exports = {
  app,
  server,
  creatSocket,
  bodyParser,
  xmlParser,
  cors,
  router,
  dbConnect: Connect,
  error,
  port
}
