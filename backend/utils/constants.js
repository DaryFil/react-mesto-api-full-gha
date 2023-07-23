const URL_REGEX = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]+\.[a-zA-Z0-9()]+\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/;

const allowedCors = ['http://darimon.nomoredomains.xyz', 'https://darimon.nomoredomains.xyz'];
const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

module.exports = {
  URL_REGEX, allowedCors, DEFAULT_ALLOWED_METHODS,
};
