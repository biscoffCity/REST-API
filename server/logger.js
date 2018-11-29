const winston = require('winston');
const config = require('./environment');
let logger = {};

// require('winston-papertrail').Papertrail;
// if (process.env.NODE_ENV === 'production') {
//   const winstonPapertrail = new winston.transports.Papertrail({
//     host: config.papertrail.host,
//     port: config.papertrail.port,
//     logFormat: function(level, message) {
//       return config.env + ':[' + level + ']:' + message;
//     }
//   });

//   logger = winston.createLogger({
//     transports: [winstonPapertrail],
//     format: winston.format.combine(winston.format.colorize()),
//     exitOnError: false
//   });
//   winstonPapertrail.on('error', err => logger.error(err));
//   winstonPapertrail.on('connect', response => logger.info(response));
// } else {
  logger = winston.createLogger({
    transports: [],
    exitOnError: false
  });
  logger.info = console.info;
  logger.error = console.error;
  logger.debug = console.debug;
  logger.log = console.log;
  logger.warn = console.warn;
// }

module.exports = logger;
