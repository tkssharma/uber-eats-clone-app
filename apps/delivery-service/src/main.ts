require("dotenv").config();
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: ["amqp://guest:guest@localhost:5672/admin"],
        queue: "order-messages",
        queueOptions: {
          durable: false,
        },
      },
    }
  );
  await app.listen();
}
bootstrap();
