const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized-err');
const { JWT_SECRET, NODE_ENV } = require('../config');

const handleAuthError = (res, req, next) => {
  next(new UnauthorizedError('Необходима авторизация'));
};
const extractBearerToken = (header) => header.replace('Bearer ', '');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return handleAuthError(res, req, next);
  }
  const token = extractBearerToken(authorization);
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV !== 'production' ? JWT_SECRET : 'some-very-incredible-very-important-and-unbelievable-secret-key');
  } catch (err) {
    return handleAuthError(res, req, next);
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  return next(); // пропускаем запрос дальше
};
