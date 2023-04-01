"use strict";
var DBModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@eats/config");
const config_2 = require("@eats/config");
let DBModule = DBModule_1 = class DBModule {
    static getConnectionOptions(config, dbConfig) {
        const dbData = config.get().db;
        if (!dbData) {
            throw Error("");
        }
        const connectionOptions = this.getConnectionOptionsPostgres(dbData);
        return {
            ...connectionOptions,
            entities: dbConfig.entities,
            synchronize: true,
            logging: true,
        };
    }
    static getConnectionOptionsPostgres(dbData) {
        return {
            type: "postgres",
            url: dbData.url,
            keepConnectionAlive: true,
            ssl: process.env.NODE_ENV !== "local" && process.env.NODE_ENV !== "test"
                ? { rejectUnauthorized: false }
                : false,
        };
    }
    static forRoot(dbConfig) {
        return {
            module: DBModule_1,
            imports: [
                typeorm_1.TypeOrmModule.forRootAsync({
                    imports: [config_1.ConfigModule],
                    useFactory: (configService) => {
                        return DBModule_1.getConnectionOptions(configService, dbConfig);
                    },
                    inject: [config_2.ConfigService],
                }),
            ],
            controllers: [],
            providers: [],
            exports: [],
        };
    }
};
DBModule = DBModule_1 = tslib_1.__decorate([
    (0, common_1.Module)({})
], DBModule);
exports.DBModule = DBModule;
