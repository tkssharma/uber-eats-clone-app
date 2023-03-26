"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const config_service_1 = require("./config.service");
const configFactory = {
    provide: config_service_1.ConfigService,
    useFactory: () => {
        const config = new config_service_1.ConfigService();
        config.loadFromEnv();
        return config;
    },
};
let ConfigModule = class ConfigModule {
};
ConfigModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [],
        controllers: [],
        providers: [configFactory],
        exports: [configFactory],
    })
], ConfigModule);
exports.ConfigModule = ConfigModule;
