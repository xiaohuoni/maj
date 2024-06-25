import { readFileSync } from 'fs';
import { join } from 'path';
import { Module } from '../Module';

export default class Keepalive extends Module {
  constructor(opts: any) {
    super(opts);
    this.name = 'keepalive';
  }
  async generateFiles() {
    const contextContent = readFileSync(
      join(__dirname, '../../../templates/keepalive/context.tsx'),
      'utf-8',
    );

    this.writeTmpFile({ path: 'context.tsx', content: contextContent });
    const indexContent = readFileSync(
      join(__dirname, '../../../templates/keepalive/index.tsx'),
      'utf-8',
    );

    this.writeTmpFile({ path: 'index.tsx', content: indexContent });
    const runtimeContent = readFileSync(
      join(__dirname, '../../../templates/keepalive/runtime.tsx'),
      'utf-8',
    );

    this.writeTmpFile({ path: 'runtime.tsx', content: runtimeContent });
    const supportContent = readFileSync(
      join(__dirname, '../../../templates/keepalive/support.tsx'),
      'utf-8',
    );

    this.writeTmpFile({ path: 'support.tsx', content: supportContent });
  }
}
