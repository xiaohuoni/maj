import { readFileSync } from 'fs';
import { join } from 'path';
import { Module } from '../Module';

export default class Keepalive extends Module {
  constructor(opts: any) {
    super(opts);
    this.name = 'keepalive';
  }
  async generateFiles() {
    const cliName = this.getCliName();
    console.log(cliName);
    const contextContent = readFileSync(
      join(__dirname, '../../../templates/plugin-keepalive/context.tsx'),
      'utf-8',
    );

    this.writeTmpFile({ path: 'context.tsx', content: contextContent });
    const indexContent = readFileSync(
      join(__dirname, '../../../templates/plugin-keepalive/index.tsx'),
      'utf-8',
    );

    this.writeTmpFile({ path: 'index.tsx', content: indexContent });
    const runtimeContent = readFileSync(
      join(__dirname, '../../../templates/plugin-keepalive/runtime.tsx'),
      'utf-8',
    );

    this.writeTmpFile({ path: 'runtime.tsx', content: runtimeContent });
    const supportContent = readFileSync(
      join(__dirname, '../../../templates/plugin-keepalive/support.tsx'),
      'utf-8',
    );

    this.writeTmpFile({ path: 'support.tsx', content: supportContent });
  }
}
