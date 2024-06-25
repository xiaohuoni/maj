import { Mustache } from '@umijs/utils';
import { readFileSync } from 'fs';
import { join } from 'path';
import { Module } from '../Module';

export default class Hd extends Module {
  constructor(opts: any) {
    super(opts);
    this.name = 'hd';
  }
  async generateFiles() {
    const hdTpl = readFileSync(
      join(__dirname, '..', '..', '..', 'templates', 'hd', 'hd.tpl'),
      'utf-8',
    );
    this.writeTmpFile({
      path: `hd.tsx`,
      content: Mustache.render(hdTpl, {}),
    });
  }
}
