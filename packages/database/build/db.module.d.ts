import { DbConfig } from "./db.interface";
export declare class DBModule {
    private static getConnectionOptions;
    private static getConnectionOptionsPostgres;
    static forRoot(dbConfig: DbConfig): {
        module: typeof DBModule;
        imports: import("@nestjs/common").DynamicModule[];
        controllers: never[];
        providers: never[];
        exports: never[];
    };
}
