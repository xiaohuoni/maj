import { createProxy } from '@umijs/bundler-utils';
import express from '@umijs/bundler-utils/compiled/express';
import http from 'http';
// @ts-ignore
import { logger } from '@umijs/utils';
import { getPort } from 'get-port-please';
import { MajConfig } from './utils/getConfig';
import { getDevBanner } from './utils/getDevBanner';
import { createMockMiddleware } from './utils/umiMock/createMockMiddleware';
import { getMockData } from './utils/umiMock/getMockData';

export interface MockConfig {
  mockDir: string;
  config?: MajConfig;
}

export async function mock({ mockDir, config = {} }: MockConfig): Promise<any> {
  const { port = 3000 } = config;
  const app = express();

  // cros
  app.use((_req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Headers',
      'Content-Type, Content-Length, Authorization, Accept, X-Requested-With',
    );
    res.header(
      'Access-Control-Allow-Methods',
      'GET, HEAD, PUT, POST, PATCH, DELETE, OPTIONS',
    );
    next();
  });

  // compression
  app.use(require('compression')());

  // TODO: proxy
  // const { proxy } = api.userConfig;

  const proxy = null;
  if (proxy) {
    createProxy(proxy, app);
  }

  // mock
  app.use(
    createMockMiddleware({
      context: {
        mockData: getMockData({
          cwd: mockDir,
          mockConfig: {},
        }),
      },
    }),
  );

  const server = http.createServer(app);
  const _port = await getPort(port);

  const protocol = 'http:';
  const host = 'localhost';

  server.listen(_port, () => {
    const banner = getDevBanner(protocol, host, _port);
    console.log(banner.before);
    logger.ready(banner.main);
    console.log(banner.after);
    console.log(banner.QR);
  });
  return { app, server, port: _port, host };
}
