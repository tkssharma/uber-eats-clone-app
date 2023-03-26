"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppLoggerModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const config_1 = require("@eats/config");
const logger_1 = require("./logger");
const logger_middleware_1 = require("./logger.middleware");
let AppLoggerModule = class AppLoggerModule {
    configure(consumer) {
        consumer.apply(logger_middleware_1.LoggerMiddleware).forRoutes("*");
    }
};
AppLoggerModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [config_1.ConfigModule],
        controllers: [],
        providers: [logger_1.Logger],
        exports: [logger_1.Logger],
    })
], AppLoggerModule);
exports.AppLoggerModule = AppLoggerModule;
