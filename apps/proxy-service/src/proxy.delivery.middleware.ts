import { NestMiddleware, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

export class ReverseProxyDeliveryMiddleware implements NestMiddleware {
  private proxy = createProxyMiddleware({
    target: 'http://localhost:3005/api/v1/',
    pathRewrite: {
      '/api/v1/delivery-service': '/',
    },
    secure: false,
    onProxyReq: (proxyReq, req, res) => {
      //console.log(proxyReq);
      // console.log(
      //   `[NestMiddleware]: Proxying ${req.method} request originally made to '${req.originalUrl}'...`,
      // );
    },
  });
  use(req: Request, res: Response, next: () => void) {
    //console.log(res);
    this.proxy(req, res, next);
  }
}
