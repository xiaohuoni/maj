import { Mustache } from '@umijs/utils';
import { readFileSync } from 'fs';
import { join } from 'path';
import { Module } from '../Module';

export default class MobileLayout extends Module {
  constructor(opts: any) {
    super(opts);
    this.name = 'mobilelayout';
  }
  async generateFiles() {
    const layoutTpl = readFileSync(
      join(
        __dirname,
        '..',
        '..',
        '..',
        'templates',
        'mobile-layout',
        'layout.tpl',
      ),
      'utf-8',
    );
    this.writeTmpFile({
      path: 'AlitaLayout.tsx',
      content: Mustache.render(layoutTpl, {
        antdMobile: this.api.config.antdMobile || 'antd-mobile',
      }),
    });

    const modelTpl = readFileSync(
      join(
        __dirname,
        '..',
        '..',
        '..',
        'templates',
        'mobile-layout',
        'model.tpl',
      ),
      'utf-8',
    );

    this.writeTmpFile({
      path: 'layoutState.ts',
      content: modelTpl,
    });

    // index.ts for layout
    this.writeTmpFile({
      path: 'index.ts',
      content: `
      export { getPageNavBar, setPageNavBar, setTabBarList, getTabBarList, layoutEmitter } from './layoutState';
      `,
    });

    // types.ts
    this.writeTmpFile({
      path: 'types.d.ts',
      content: `export type { NavBarProps, TitleListItem, NavBarListItem, TabBarProps, TabBarListItem, } from './AlitaLayout';`,
    });
  }
  getInstallDependencies() {
    return {
      dependencies: ['antd-mobile-icons', 'antd-mobile'],
    };
  }
}
