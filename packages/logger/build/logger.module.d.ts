import { MiddlewareConsumer, NestModule } from "@nestjs/common";
export declare class AppLoggerModule implements NestModule {
    configure(consumer: MiddlewareConsumer): void;
}
