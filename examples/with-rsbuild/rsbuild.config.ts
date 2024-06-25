import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

export default defineConfig({
  plugins: [pluginReact()],
  source: {
    alias: {
      src: './src',
    },
  },
  tools: {
    postcss: () => {
      return {
        postcssOptions: {
          plugins: [
            require('autoprefixer'),
            require('@alitajs/postcss-plugin-px2rem')({
              rootValue: 100,
              minPixelValue: 2,
              selectorDoubleRemList: [/^.adm-/, /^.ant-/, /^\:root/],
            }),
          ],
        },
      };
    },
  },
});
