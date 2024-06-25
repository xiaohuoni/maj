import express from '@umijs/bundler-utils/compiled/express';
import { createProxyMiddleware } from '@umijs/bundler-utils/compiled/http-proxy-middleware';
import { build } from '@umijs/mako';
import { mock } from './mock';
import { Plugins } from './plugins/Plugins';
import { Paths, winJoin } from './utils/path';

export interface DevConfig {
  paths: Paths;
  plugins: Plugins;
}

export async function dev({ paths, plugins }: DevConfig): Promise<any> {
  const { cwd } = paths;
  const { app, server, port, host } = await mock({
    mockDir: winJoin(cwd, 'mock'),
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
  app.use(express.static(paths.absOutputPath));

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
      resolve: {
        alias: {
          src: './src',
          // TODO: useConfig
          'antd-mobile': 'antd-mobile/2x',
        },
      },
      // TODO: useConfig
      px2rem: {},
      devServer: { port: hmrPort, host },
      plugins: plugins.getMakoPlugin(),
      mode: 'development',
      devtool: 'source-map',
    },
    watch: true,
  }).catch((e) => {
    console.error(e);
    process.exit(1);
  });
}
