"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isLogLevel = exports.LogLevel = void 0;
/**
 * Indicates the severity of a log message.
 */
var LogLevel;
(function (LogLevel) {
    /** Critical error, system stability is affected. */
    LogLevel["Error"] = "error";
    /** Non-critical error, system stability is not affected, but issue should be investigated. */
    LogLevel["Warn"] = "warn";
    /** Informative message. */
    LogLevel["Info"] = "info";
    /** HTTP access logging. */
    LogLevel["HTTP"] = "http";
    /** More verbose informative message. */
    LogLevel["Verbose"] = "verbose";
    /** Message to assist with debugging. */
    LogLevel["Debug"] = "debug";
    /** Unnecessarily noisy or frequent message. */
    LogLevel["Silly"] = "silly";
})(LogLevel = exports.LogLevel || (exports.LogLevel = {}));
const allLogLevels = [
    LogLevel.Error,
    LogLevel.Warn,
    LogLevel.Info,
    LogLevel.HTTP,
    LogLevel.Verbose,
    LogLevel.Debug,
    LogLevel.Silly,
];
/**
 * Determines if the value is a valid log level or not.
 * @param value the value to test
 * @returns true if a log level, false if not
 */
function isLogLevel(value) {
    if (typeof value !== "string") {
        return false;
    }
    return allLogLevels.indexOf(value) !== -1;
}
exports.isLogLevel = isLogLevel;
