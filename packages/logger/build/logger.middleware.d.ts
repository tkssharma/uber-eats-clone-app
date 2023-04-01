import { NestMiddleware } from "@nestjs/common";
import { Request, Response } from "express";
import { Logger } from "./logger";
export interface RequestLog extends Request {
    correlationId?: string | string[];
    parentSpan?: string | string[];
    span?: string | string[];
    origin?: string;
}
export declare class LoggerMiddleware implements NestMiddleware<Request, Response> {
    private logger;
    constructor(logger: Logger);
    use(req: RequestLog, res: Response, next: () => void): any;
    private getResponseSize;
    private generateLogMessage;
}
