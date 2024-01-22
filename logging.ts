import { Request } from "express";
import { Logger, createLogger, addColors, config, transports, format } from "winston";

const DEFAULT_MAX_LEVEL ='debug';

export class Logging {
    public static logger: Logger;
    private static consoleTransport: transports.ConsoleTransportInstance;
    public static currentLevel: string;

    public static init (): void {
    addColors({
            trace: config.npm.colors.silly,
            security: config.syslog.colors.notice,
            perf: config.syslog.colors.notice,
        });
        Logging.logger = createLogger({
            levels:
            {
                error: 0,
                warn: 1,
                info: 2,
                security: 2,
                http: 3,
                debug: 4,
                perf: 4,
                verbose: 5,
                trace: 6,
            },
            defaultMeta: {
                type: 'Q-Company-book-application',
                pid: process.pid,
                component: 'book-application',
                environment: 'development',
            },
            transports: [new transports.Console(), // Log to the console
        ],
        });
        Logging.currentLevel = process.env.LOG_LEVEL || DEFAULT_MAX_LEVEL;

        Logging.consoleTransport = new transports.Console({
            level: Logging.currentLevel,
            format: format.combine(
                format.timestamp({
                    format: 'YYYY-MM-DD HH:mm:ss.SSS',
                }),
                format.colorize()
        )})
            
        //Logging.setConsoleTransport();

        Logging.logger.add(Logging.consoleTransport);
    }
    public static error (msg: string, err?: Error): void {
        Logging.logger.error(msg);
    }

    public static warn (msg: string): void {
        Logging.logger.warn(msg);
    }

    public static info (msg: string): void {
        Logging.logger.info(msg);
    }

    public static debug (msg: string): void {
        Logging.logger.debug(msg);
    }
}

