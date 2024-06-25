import { Mustache } from '@umijs/utils';
import { readFileSync } from 'fs';
import { join } from 'path';
import { Module } from '../Module';

export default class Aconsole extends Module {
  constructor(opts: any) {
    super(opts);
    this.name = 'aconsole';
  }
  async generateFiles() {
    // inspx.ts
    const inspxTpl = readFileSync(
      join(__dirname, '..', '..', '..', 'templates', 'aconsole', 'inspx.tpl'),
      'utf-8',
    );
    this.writeTmpFile({
      path: 'inspx.tsx',
      content: Mustache.render(inspxTpl, {
        // inspxpath: join(__dirname,'..','compiled','@alita','inspx'),
        // inspxpath: winPath(dirname(require.resolve('@alita/inspx/package'))),
        inspx: {
          disabled: false,
          margin: true,
          size: true,
          padding: true,
          bottom: 'calc(env(safe-area-inset-bottom) + 2.2rem)',
          right: '0',
        },
      }),
    });

    // runtime.tsx
    const runtimeTpl = readFileSync(
      join(__dirname, '..', '..', '..', 'templates', 'aconsole', 'runtime.tpl'),
      'utf-8',
    );
    this.writeTmpFile({
      path: 'runtime.tsx',
      content: runtimeTpl,
    });
  }
}
