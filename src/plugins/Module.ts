import { JsHooks } from '@umijs/mako/binding';
import { writeTmpFile, WriteTmpFileOptions } from '../utils/api';
import { Api } from './Api';
export interface IInstallDeps {
  devDependencies?: string[];
  dependencies?: string[];
}
export class Module {
  public name: string = '';
  public api: Api;
  constructor({ api }: { api: Api }) {
    this.api = api;
  }
  writeTmpFile(params: Omit<WriteTmpFileOptions, 'paths' | 'name'>) {
    writeTmpFile({ ...params, paths: this.api.paths, name: this.name });
  }
  async generateFiles() {}
  async setup() {
    await this.generateFiles();
  }
  getMakoPlugin(): JsHooks | null {
    return null;
  }
  getInstallDependencies(): IInstallDeps {
    return {};
  }
}
