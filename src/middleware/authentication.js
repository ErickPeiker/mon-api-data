const models = require('../model');

const controllerAuthenticationMiddleware = async (req, res, next) => {
  // const token = req.header('Authorization');

  // if (!token) {
  //   return res.status(401).send({
  //     error: { message: 'No token provided.' }
  //   });
  // }

  // const user = await models.User.findOne({
  //   where: {
  //     apiToken: token
  //   },
  //   raw: true
  // });

  // if (!user) {
  //   return res.status(500).send({
  //     error: { message: 'Failed to authenticate token.' }
  //   });
  // }

  next();
}

const socketIoAuthenticationMiddleware = async (socket, next) => {
  const token = socket.handshake.query && socket.handshake.query.token;
  if (!token) {
    return next(new Error('No token provided.'));
  }

  const user = await models.User.findOne({
    where: {
      apiToken: token
    },
    raw: true
  });

  if (!user) {
    return next(new Error('Failed to authenticate token.'));
  }

  return next();
}

module.exports = {
  controllerAuthenticationMiddleware,
  socketIoAuthenticationMiddleware,
};
