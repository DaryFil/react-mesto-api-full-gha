// Подключение необходимых модулей и файлов
const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const { celebrate, Joi } = require('celebrate');
const { errors } = require('celebrate');
const helmet = require('helmet');
const cors = require('cors');
const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const {
  createUser, login,
} = require('./controllers/users');
const { URL_REGEX } = require('./utils/constants');
const { DB_URL, PORT } = require('./config');

// Создание экземпляра приложения Express
const app = express();

// Отключение заголовка "x-powered-by"
app.disable('x-powered-by');

// Подключение к базе данных MongoDB
mongoose
  .connect(DB_URL);

app.use(requestLogger); // подключаем логгер запросов

app.use(express.json());
app.use(cookieParser());

const allowedCors = ['https://darimon.nomoredomains.xyz', 'http://localhost:3000'];

const corsOptions = {
  origin: allowedCors,
  optionsSuccessStatus: 200,
  credentials: true,
};

app.use(cors(corsOptions));
// Применение промежуточного ПО для обеспечения безопасности
app.use(helmet());
// краш-тест для проверки автоматического перезапуска сервера
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

// Создать нового пользователя
app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(URL_REGEX),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), createUser);

app.use('/', auth, require('./routes/index'));

app.use(errorLogger); // подключаем логгер ошибок

app.use(errors());

app.use(require('./middlewares/error'));
// Запуск сервера на указанном порту
app.listen(PORT, () => {
  console.log(`Приложение слушает порт ${PORT}`);
});
