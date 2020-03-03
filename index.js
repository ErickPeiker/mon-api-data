const bodyParser = require('body-parser');
const app = require('express')();
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// Mysql
const requireDir = require('require-dir');
const sequelize = require('sequelize');
const db = require('./src/model');
requireDir('./src/model');
db.sequelize.sync();

// CORS
const cors = require('cors');
app.use(cors());

// Routes
const routes = require('./routes');
app.use(routes);

// Socket.io
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server, {
  pingInterval: 10000,
  pingTimeout: 360000,
});
const { socketIoAuthenticationMiddleware } = require('./src/middleware/authentication');
const socketRoutes = require('./src/routes/socket');

// app.set('socket.io', io);
io.use(socketIoAuthenticationMiddleware)
.on('connection', socketRoutes)
.on('error', error => {
  console.log('error');
  cosole.log(error);
});

server.listen(3001, () => console.log(`Listening on port 3001`));
