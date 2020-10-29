import winston, { Logger, Logform } from 'winston';
// import { join } from 'path';

// import { LOG_PATH } from '@rereddit/config';
import { nodeEnv } from '@rereddit/utils';

class LoggerUtils {
    private static instance: Logger;

    private getLogger(): Logger {
        const logger = winston.createLogger({
            level: 'info',
            format: winston.format.combine(
                winston.format.errors({ stack: true }),
                winston.format.timestamp(),
                winston.format.colorize(),
                winston.format.json()
            ),
            /*
            transports: [
                new winston.transports.File({
                    filename: join(LOG_PATH, 'combined.log'),
                }),
                new winston.transports.File({
                    filename: join(LOG_PATH, 'error.log'),
                    level: 'error',
                }),
            ],*/
        });

        if (nodeEnv !== 'production') {
            logger.add(
                new winston.transports.Console({
                    format: winston.format.combine(
                        winston.format.errors({ stack: true }),
                        winston.format.timestamp(),
                        winston.format.colorize(),
                        winston.format.printf(this.logTransform)
                    ),
                })
            );
        }

        return logger;
    }

    static getInstance(): Logger {
        if (!LoggerUtils.instance) {
            const loggerUtils = new LoggerUtils();
            LoggerUtils.instance = loggerUtils.getLogger();
        }

        return LoggerUtils.instance;
    }

    private logTransform = (info: Logform.TransformableInfo): string => {
        const { level, message } = info;
        return `${level} ${message}`;
    };
}

const logger = LoggerUtils.getInstance();

export { Logger, logger };
