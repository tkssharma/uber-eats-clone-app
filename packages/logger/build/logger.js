"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const moment = require("moment");
const winston = require("winston");
const loglevel_1 = require("./loglevel");
const formatter = winston.format((info) => {
    if (info.level === loglevel_1.LogLevel.HTTP) {
        // HTTP messages are already formatted by the middleware, so just pass through
        return info;
    }
    if (process.env.NODE_ENV !== "test") {
        info.message = `[${moment().format("ddd MMM DD HH:mm:ss YYYY")}] [${info.level}] ${info.message}`;
    }
    return info;
});
/**
 * Provides a means to write log messages.
 */
let Logger = class Logger {
    constructor() {
        this.logger = winston.createLogger({
            level: 'info',
            format: formatter(),
        });
        this.logger.add(new winston.transports.Console({
            format: winston.format.json(),
            stderrLevels: [loglevel_1.LogLevel.Error, loglevel_1.LogLevel.Warn],
        }));
    }
    log(p0, p1, meta) {
        const logLevel = (0, loglevel_1.isLogLevel)(p0) ? p0 : loglevel_1.LogLevel.Info;
        const message = (0, loglevel_1.isLogLevel)(p0) && p1 ? p1 : p0;
        this.logger.log(logLevel, message, meta);
    }
    /**
     * Adds default metadata to every log message.
     * @param correlationId the log message
     */
    setDefaultMeta(correlationId) {
        this.logger.defaultMeta = { correlationId };
    }
    /**
     * Writes a log message with the {@link LogLevel.Error} log level.
     * @param message the log message
     */
    error(message) {
        this.log(loglevel_1.LogLevel.Error, message);
    }
    /**
     * Writes a log message with the {@link LogLevel.Warn} log level.
     * @param message the log message
     */
    warn(message) {
        this.log(loglevel_1.LogLevel.Warn, message);
    }
    /**
     * Writes a log message with the {@link LogLevel.Info} log level.
     * @param message the log message
     */
    info(message) {
        this.log(loglevel_1.LogLevel.Info, message);
    }
    /**
     * Writes a log message with the {@link LogLevel.HTTP} log level.
     * @param message the log message
     */
    http(message) {
        this.log(loglevel_1.LogLevel.HTTP, message);
    }
    /**
     * Writes a log message with the {@link LogLevel.Verbose} log level.
     * @param message the log message
     */
    verbose(message) {
        this.log(loglevel_1.LogLevel.Verbose, message);
    }
    /**
     * Writes a log message with the {@link LogLevel.Debug} log level.
     * @param message the log message
     */
    debug(message) {
        this.log(loglevel_1.LogLevel.Debug, message);
    }
    /**
     * Writes a log message with the {@link LogLevel.Silly} log level.
     * @param message the log message
     */
    silly(message) {
        this.log(loglevel_1.LogLevel.Silly, message);
    }
};
Logger = tslib_1.__decorate([
    (0, common_1.Injectable)()
], Logger);
exports.Logger = Logger;
