import { defineConfig } from '@farmfe/core';
import farmJsPluginPostcss from '@farmfe/js-plugin-postcss';
import path from 'path';

export default defineConfig({
  compilation: {
    resolve: {
      alias: {
        src: path.join(process.cwd(), 'src'),
      },
    },
  },
  plugins: [
    '@farmfe/plugin-react',
    farmJsPluginPostcss({
      postcssLoadConfig: {
        path: process.cwd(),
      },
    }),
  ],
});
