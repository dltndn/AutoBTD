const express = require('express');
const helmet = require('helmet');
const xss = require('xss-clean');
const httpStatus = require('http-status');

// const morgan = require('./config/morgan');

const routes = require('./routes/v1');
const ApiError = require('./utils/ApiError');

const app = express();

const cors = require('cors');
app.use(cors({origin: true, credentials: true}));

app.get('/health', (req, res, next) => {
   res.send('success')
   res.end();
})

// app.use(morgan.successHandler);
// app.use(morgan.errorHandler);

app.use(helmet());
app.use(express.json({limit: "50mb"}));
app.use(express.urlencoded({limit: "50mb", extended: false}));
app.use(xss());

app.use('/v1', routes);

app.use((req, res, next) => {
   next(new ApiError(httpStatus.NOT_FOUND, 'Not Found'))
});

module.exports = app;