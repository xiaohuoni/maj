import { join } from 'path';
import { registerMakoPlugin } from '../../utils/mako-plugins';
import { Module } from '../Module';
import routesMakoPlugin from './mako-plugin-routes';

const ROUTES_PATH_NAME = 'routes.ts';

export default class Routes extends Module {
  constructor(opts: any) {
    super(opts);
    this.name = 'routes';
  }
  async generateFiles() {
    // 为什么要写一个空文件？
    // 通过 mako 监听变更，不用重新 reset
    // 理由不充分，刚开始写的是 mako 插件，觉得很酷，就先保留
    this.writeTmpFile({
      path: ROUTES_PATH_NAME,
      noPluginDir: true,
      content: 'export default [] as { path: string; component: any }[];',
    });
  }

  getMakoPlugin() {
    const routerPath = join(this.paths.absTmpPath, ROUTES_PATH_NAME);
    return registerMakoPlugin({
      config: {
        paths: this.paths,
        routerPath,
        conventionRoutes: {
          // 规定只有index文件会被识别成路由
          exclude: [
            /(?<!(index|\[index\]|404)(\.(js|jsx|ts|tsx)))$/,
            /model\.(j|t)sx?$/,
            /\.test\.(j|t)sx?$/,
            /service\.(j|t)sx?$/,
            /models\//,
            /components\//,
            /services\//,
          ],
        },
      },
      plugin: routesMakoPlugin,
    });
  }
}
