import { JsHooks } from '@umijs/mako/binding';
import { writeTmpFile, WriteTmpFileOptions } from '../utils/api';
import { Paths } from '../utils/path';

export class Module {
  public paths: Paths;
  public name: string = '';
  public getCliName;
  constructor({
    paths,
    getCliName,
  }: {
    paths: Paths;
    getCliName: () => string;
  }) {
    this.paths = paths;
    this.getCliName = getCliName;
  }
  writeTmpFile(params: Omit<WriteTmpFileOptions, 'paths' | 'name'>) {
    writeTmpFile({ ...params, paths: this.paths, name: this.name });
  }
  async generateFiles() {}
  async setup() {
    await this.generateFiles();
  }
  getMakoPlugin(): JsHooks | null {
    return null;
  }
}
