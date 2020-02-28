import winston from 'winston';

const myCustomLevels = {
  levels: {
    info: 0,
    warn: 1,
    error: 2,
    critical: 3,
  },
  colors: {
    info: 'blue',
    warn: 'yellow',
    error: 'red',
    critical: 'red',
  },
};

export const logger = () => {
  winston.addColors(myCustomLevels.colors);
  winston.createLogger({
    levels: myCustomLevels.levels,
    format: winston.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [
      new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
      new winston.transports.File({ filename: 'logs/combined.log' }),
    ],
    exceptionHandlers: [
      new winston.transports.File({ filename: 'logs/exceptions.log' }),
    ],
  });

  if (process.env.NODE_ENV !== 'production') {
    winston.add(new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple(),
      ),
    }));
  }
};
