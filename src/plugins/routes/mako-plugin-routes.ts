import { JsHooks } from '@umijs/mako/binding';
import { getRoutes } from './umiRoutes/routes';

export default {
  name: 'routes',
  load: async function load(path: string, config: any): Promise<any> {
    const { paths, routerPath } = config;
    const api: any = {
      userConfig: {},
      applyPlugins: ({ initialValue }: any) => initialValue,
      config,
      paths,
    };
    // routes
    const routes = await getRoutes({ api });
    if (path === routerPath) {
      const routesStr = Object.keys(routes)
        .map((key) => {
          const r = routes[key];
          return `{ path: '/${r.path}', component: lazy(async () => {
              return await import('${r.__absFile}');
            })}`;
        })
        .join(',');

      return {
        content: `
          import { lazy } from "react";
          const routes = [${routesStr}];
          export default routes;
          `,
        type: 'ts',
      };
    }
  },
} as JsHooks;
