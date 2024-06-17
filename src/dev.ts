import { build } from '@umijs/mako';
import { Plugins } from './plugins/Plugins';
import { Paths } from './utils/path';
export interface DevConfig {
  paths: Paths;
  watch?: boolean;
  plugins: Plugins;
}

export async function dev({
  paths,
  watch = process.argv.includes('--watch'),
  plugins,
}: DevConfig): Promise<any> {
  const { cwd } = paths;

  build({
    root: cwd,
    config: {
      resolve: {
        alias: {
          '@': './src',
          '@@': './src/.maj',
        },
      },
      plugins: plugins.getMakoPlugin(),
    },
    watch,
  }).catch((e) => {
    console.error(e);
    process.exit(1);
  });
}
