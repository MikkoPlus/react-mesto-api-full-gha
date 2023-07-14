require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const { errors } = require('celebrate');
const { errorLogger, requestLogger } = require('./middlewares/logger');

const router = require('./routes/index');
const errorHandler = require('./middlewares/error');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodatabase');
app.use(express.json());
app.use(helmet());
app.use(cors({ credentials: true, origin: 'http://meste4ko.nomoredomains.work' }));
app.options('*', cors());
app.use(cookieParser());
app.use(requestLogger);
app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server start on port: ${PORT}`);
});
