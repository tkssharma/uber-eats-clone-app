"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerMiddleware = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const moment = require("moment");
const uuid_1 = require("uuid");
/* eslint-disable no-useless-escape */
let LoggerMiddleware = class LoggerMiddleware {
    constructor(logger) {
        this.logger = logger;
    }
    use(req, res, next) {
        const before = Date.now();
        const id = req.headers["x-request-id"]
            ? req.headers["x-request-id"]
            : (0, uuid_1.v4)();
        this.logger && this.logger.setDefaultMeta(id);
        const span = req.headers["x-span"] || "0";
        req.correlationId = id;
        req.parentSpan = span;
        req.span = span;
        next();
        res.on("close", () => this.logger &&
            this.logger.http(this.generateLogMessage(req, res, Date.now() - before)));
    }
    getResponseSize(res) {
        const sizeRaw = res.getHeader("Content-Length");
        if (typeof sizeRaw === "number") {
            return sizeRaw;
        }
        if (typeof sizeRaw === "string") {
            const parsed = parseInt(sizeRaw, 10);
            if (isNaN(parsed)) {
                return 0;
            }
            return parsed;
        }
        return 0;
    }
    /*
     date=${moment().format('DD/MMM/YYYY:HH:mm:ss ZZ')} trace=${id} type=IncomingRequest endpoint=${req.originalUrl} duration=${duration} span=${span} status=${res.statusCode}
     */
    generateLogMessage(req, res, timeTaken) {
        const size = this.getResponseSize(res);
        const terms = {
            "%h": req.socket.remoteAddress || "-",
            "%l": "-",
            "%x1": `span=${req.span}`,
            "%x2": `trace=${req.correlationId}`,
            "%x3": "type=Incoming request",
            "%u": "-",
            "%t": `date=[${moment().format("DD/MMM/YYYY:HH:mm:ss ZZ")}]`,
            "%r": `request=${req.method} ${req.originalUrl} ${req.httpVersion}`,
            "%>s": `status=${res.statusCode}`,
            "%b": size === 0 ? "size=-" : `size=${size}`,
            "%tt": `duration=${timeTaken}`,
        };
        let str = '%t %x2 %x3 "%r" %x1 %>s %b %tt';
        for (const term in terms) {
            if (term in terms) {
                str = str.replace(term, terms[term]);
            }
        }
        str = str.replace(/%\{([a-zA-Z\-]+)\}i/g, (_match, p1) => {
            const header = req.headers[`${p1}`.toLowerCase()];
            if (header == null) {
                return "-";
            }
            if (Array.isArray(header)) {
                return `"${header.join(",")}"`;
            }
            return `"${header}"`;
        });
        return str;
    }
};
LoggerMiddleware = tslib_1.__decorate([
    (0, common_1.Injectable)()
], LoggerMiddleware);
exports.LoggerMiddleware = LoggerMiddleware;
