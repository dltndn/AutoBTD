const app = require('./app');
const config = require('./config/config');
// const {sequelize} = require('./models');

let server;

(async () => {
   try {
      // sequelize 관련
    //   sequelize.sync({alter: true})
    //     .then(async () => {
    //        // 서버 실행 관련
    //        server = app.listen(config.port, () => {
    //           console.log('Listening to port %d', config.port);
    //        })
    //        server.keepAliveTimeout = 61 * 1000;
    //        server.headersTimeout = 65 * 1000; // This should be bigger than `keepAliveTimeout + your server's expected response time`
    //     })
    //     .catch((err) => {
    //        console.log(err);
    //     });
        server = app.listen(config.port, () => {
            console.log('Listening to port %d', config.port);
         })
         server.keepAliveTimeout = 61 * 1000;
         server.headersTimeout = 65 * 1000; // This should be bigger than `keepAliveTimeout + your server's expected response time`
   } catch(e) {
      console.error(e);
      exitHandler();
   }
})()

const exitHandler = () => {
   if(server) {
      server.close(() => {
         console.log('Server closed');
         process.exit(1);
      })
   } else {
      process.exit(1);
   }
}

const unexpectedErrorHandler = (error) => {
   console.error(error);
   exitHandler();
}

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGINT', exitHandler);