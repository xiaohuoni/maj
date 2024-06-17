import { JsHooks } from '@umijs/mako/binding';
import { getRoutes } from '@umijs/preset-umi/dist/features/tmpFiles/routes';

export default {
  name: 'routes',
  load: async function load(path: string, config): Promise<any> {
    const { paths } = config;
    const { absPagesPath, absSrcPath, routerPath } = paths;
    const api: any = {
      userConfig: {},
      applyPlugins: ({ initialValue }) => initialValue,
      config,
      paths,
    };
    // routes
    const routes = await getRoutes({ api });
    if (path === routerPath) {
      const routesStr = Object.keys(routes)
        .map((key) => {
          const r = routes[key];
          return `{ path: '${r.path}', component: lazy(async () => {
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
