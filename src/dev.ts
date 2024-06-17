import { build } from '@umijs/mako';
import { join } from 'path';
import routes from './mako-plugins/routes';
import { registerMakoPlugin } from './utils/mako-plugins';
import { Paths } from './utils/path';
export interface DevConfig {
  paths: Paths;
  watch?: boolean;
}

export async function dev({
  paths,
  watch = process.argv.includes('--watch'),
}: DevConfig): Promise<any> {
  const { cwd, absPagesPath, absSrcPath } = paths;
  const routerPath = join(absSrcPath, './routes.ts');

  build({
    root: cwd,
    config: {
      plugins: [
        registerMakoPlugin({
          config: {
            paths: {
              absSrcPath,
              routerPath,
              absPagesPath,
            },
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
          plugin: routes,
        }),
      ],
    },
    watch,
  }).catch((e) => {
    console.error(e);
    process.exit(1);
  });
}
