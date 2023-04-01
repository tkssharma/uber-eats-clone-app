require("dotenv").config();
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { createDocument } from "./docs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { snapshot: true });
  const globalPrefix = "api/v1";
  app.setGlobalPrefix(globalPrefix);

  app.use((req, _, next) => {
    //console.log(`Got invoked: '${req.originalUrl}'`);
    next();
  });
  createDocument(app);
  await app.listen(3001 || process.env.PORT);
}
bootstrap();
