import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createProxyMiddleware } from 'http-proxy-middleware';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bodyParser: false });
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  app.use((req, _, next) => {
    console.log(`Got invoked: '${req.originalUrl}'`);
    next();
  });

  /*
  app.use(
    `/api/v1/auth-service/*`,
    createProxyMiddleware({
      target: 'http://localhost:3000/api/v1/',
      pathRewrite: {
        '/api/v1/auth-service': '/',
      },
      secure: false,
      onProxyReq: (proxyReq, req, res) => {
        console.log(proxyReq);
        console.log(
          `[NestMiddleware]: Proxying ${req.method} request originally made to '${req.originalUrl}'...`,
        );
      },
    }),
  );
*/
  await app.listen(3001, () => {
    //console.log('Listening at http://localhost:' + 3001 + '/' + globalPrefix);
  });
}
bootstrap();
