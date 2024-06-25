import { build as makoBuild } from '@umijs/mako';
import { Api } from './plugins/Api';

export interface BuildConfig {
  api: Api;
}

export async function build({ api }: BuildConfig): Promise<any> {
  const { cwd } = api.paths;
  makoBuild({
    root: cwd,
    config: {
      plugins: api.getMakoPlugin(),
      mode: 'production',
      devtool: false,
      ...api.config,
      resolve: {
        alias: {
          src: './src',
          ...api.config?.resolve?.alias,
        },
      },
    },

    watch: false,
  }).catch((e) => {
    console.error(e);
    process.exit(1);
  });
}
