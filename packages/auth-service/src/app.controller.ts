import { Controller, Get } from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import {
  HealthCheck,
  HealthCheckService,
  TypeOrmHealthIndicator,
} from "@nestjs/terminus";

@Controller("/api/v1/health")
export class AppController {
  constructor(
    private readonly health: HealthCheckService,
    private db: TypeOrmHealthIndicator
  ) {}

  @ApiOkResponse({ description: "returns the health check " })
  @ApiTags("health")
  @Get()
  @HealthCheck()
  getHello() {
    return this.health.check([async () => this.db.pingCheck("typeorm")]);
  }
}
