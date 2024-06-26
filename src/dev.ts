import express from '@umijs/bundler-utils/compiled/express';
import { createProxyMiddleware } from '@umijs/bundler-utils/compiled/http-proxy-middleware';
import { build } from '@umijs/mako';
import { mock } from './mock';
import { Api } from './plugins/Api';
import { winJoin } from './utils/path';

export interface DevConfig {
  api: Api;
}

export async function dev({ api }: DevConfig): Promise<any> {
  const { cwd, absOutputPath } = api.paths;
  const { app, server, port, host } = await mock({
    mockDir: winJoin(cwd, 'mock'),
    config: api.config,
  });
  const hmrPort = port + 1;
  // proxy ws to mako server
  const wsProxy = createProxyMiddleware({
    // mako server in the same host so hard code is ok
    target: `http://127.0.0.1:${hmrPort}`,
    ws: true,
    logLevel: 'silent',
  });
  app.use('/__/hmr-ws', wsProxy);

  // serve dist files
  app.use(express.static(absOutputPath));

  // history fallback
  app.use(
    require('connect-history-api-fallback')({
      index: '/',
    }),
  );

  // prevent first websocket auto disconnected
  // ref https://github.com/chimurai/http-proxy-middleware#external-websocket-upgrade
  server.on('upgrade', wsProxy.upgrade);
  build({
    root: cwd,
    config: {
      devServer: { port: hmrPort, host },
      plugins: api.getMakoPlugin(),
      mode: 'development',
      devtool: 'source-map',
      ...api.config,
      resolve: {
        alias: {
          src: './src',
          ...api.config?.resolve?.alias,
        },
      },
    },
    watch: true,
  }).catch((e) => {
    console.error(e);
    process.exit(1);
  });
}
