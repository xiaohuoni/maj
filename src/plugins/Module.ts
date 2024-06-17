import { JsHooks } from '@umijs/mako/binding';
import { writeTmpFile, WriteTmpFileOptions } from '../utils/api';
import { Paths } from '../utils/path';

export class Module {
  public paths: Paths;
  public name: string = '';
  constructor({ paths }: { paths: Paths }) {
    this.paths = paths;
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
