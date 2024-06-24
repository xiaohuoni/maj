import { build as makoBuild } from '@umijs/mako';
import { Plugins } from './plugins/Plugins';
import { Paths } from './utils/path';

export interface BuildConfig {
  paths: Paths;
  plugins: Plugins;
}

export async function build({ paths, plugins }: BuildConfig): Promise<any> {
  const { cwd } = paths;
  makoBuild({
    root: cwd,
    config: {
      resolve: {
        alias: {
          src: './src',
        },
      },
      plugins: plugins.getMakoPlugin(),
      mode: 'production',
      devtool: false,
    },

    watch: false,
  }).catch((e) => {
    console.error(e);
    process.exit(1);
  });
}
