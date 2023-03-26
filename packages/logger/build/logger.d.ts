import { LoggerService } from "@nestjs/common";
import * as winston from "winston";
import { ConfigService } from "@eats/config";
import { LogLevel } from "./loglevel";
/**
 * Provides a means to write log messages.
 */
export declare class Logger implements LoggerService {
    private configService;
    logger: winston.Logger;
    constructor(configService: ConfigService);
    /**
     * Writes a log message.
     * @param level the severity of the message
     * @param message the log message
     */
    log(level: LogLevel, message: string): void;
    /**
     * Writes a log message with the {@link LogLevel.Info} log level.
     * @param message the log message
     */
    log(message: string): void;
    /**
     * Adds default metadata to every log message.
     * @param correlationId the log message
     */
    setDefaultMeta(correlationId: string): void;
    /**
     * Writes a log message with the {@link LogLevel.Error} log level.
     * @param message the log message
     */
    error(message: string): void;
    /**
     * Writes a log message with the {@link LogLevel.Warn} log level.
     * @param message the log message
     */
    warn(message: string): void;
    /**
     * Writes a log message with the {@link LogLevel.Info} log level.
     * @param message the log message
     */
    info(message: string): void;
    /**
     * Writes a log message with the {@link LogLevel.HTTP} log level.
     * @param message the log message
     */
    http(message: string): void;
    /**
     * Writes a log message with the {@link LogLevel.Verbose} log level.
     * @param message the log message
     */
    verbose(message: string): void;
    /**
     * Writes a log message with the {@link LogLevel.Debug} log level.
     * @param message the log message
     */
    debug(message: string): void;
    /**
     * Writes a log message with the {@link LogLevel.Silly} log level.
     * @param message the log message
     */
    silly(message: string): void;
}
