const jsonServer  = require('json-server')
const server      = jsonServer.create()
const router      = jsonServer.router(require('./db.js')())
const middlewares = jsonServer.defaults()

server.use(middlewares)
server.use(router)
server.listen(3005, function () {
console.log('JSON Server is running')
})