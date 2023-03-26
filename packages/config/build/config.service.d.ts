import { ConfigData } from "./config.interface";
export declare class ConfigService {
    private config;
    constructor(data?: ConfigData);
    loadFromEnv(): void;
    private parseConfigFromEnv;
    private parseDBConfig;
    private parseSwaggerConfig;
    get(): Readonly<ConfigData>;
}
