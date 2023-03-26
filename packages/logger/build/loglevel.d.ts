/**
 * Indicates the severity of a log message.
 */
export declare enum LogLevel {
    /** Critical error, system stability is affected. */
    Error = "error",
    /** Non-critical error, system stability is not affected, but issue should be investigated. */
    Warn = "warn",
    /** Informative message. */
    Info = "info",
    /** HTTP access logging. */
    HTTP = "http",
    /** More verbose informative message. */
    Verbose = "verbose",
    /** Message to assist with debugging. */
    Debug = "debug",
    /** Unnecessarily noisy or frequent message. */
    Silly = "silly"
}
/**
 * Determines if the value is a valid log level or not.
 * @param value the value to test
 * @returns true if a log level, false if not
 */
export declare function isLogLevel(value: unknown): value is LogLevel;
