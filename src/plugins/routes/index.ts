import { Module } from '../Module';
import { getRoutes } from './umiRoutes/routes';

const ROUTES_PATH_NAME = 'routes.ts';

export default class Routes extends Module {
  constructor(opts: any) {
    super(opts);
    this.name = 'routes';
  }
  async generateFiles() {
    const api: any = {
      userConfig: {},
      applyPlugins: ({ initialValue }: any) => initialValue,
      config: {
        paths: this.api.paths,
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
      paths: this.api.paths,
    };
    // routes
    const routes = await getRoutes({ api });
    const routesStr = Object.keys(routes)
      .map((key) => {
        const r = routes[key];
        return `{ path: '/${r.path}', component: lazy(async () => {
              return await import('../pages/${r.file}');
            })}`;
      })
      .join(',');

    this.writeTmpFile({
      path: ROUTES_PATH_NAME,
      noPluginDir: true,
      content: `
          import { lazy } from "react";
          const routes = [${routesStr}];
          export default routes;
          `,
    });
  }
}
