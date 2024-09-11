const winston = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');

// Define the log format
const logFormat = winston.format.printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}]: ${message}`;
});

// Create the Winston logger instance with rotation
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    logFormat
  ),
  transports: [
    new winston.transports.Console(), // Logs to the console
    new DailyRotateFile({
      filename: 'logs/%DATE%-app.log', // File name pattern with date
      datePattern: 'YYYY-MM-DD', // Daily rotation
      maxSize: '20m', // Max file size before rotation
      maxFiles: '14d' // Keep files for 14 days
    })
  ],
});

module.exports = logger;
