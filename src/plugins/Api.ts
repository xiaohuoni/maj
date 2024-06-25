import { JsHooks } from '@umijs/mako/binding';
import { MajConfig } from '../utils/getConfig';
import { Paths } from '../utils/path';
import { Module } from './Module';
export class Api {
  public paths: Paths;
  public name: string = '';
  public cliName: string = '';
  public modules: Module[];
  public config: MajConfig;
  constructor({
    paths,
    modules = [],
    config,
  }: {
    paths: Paths;
    config: MajConfig;
    modules: (typeof Module)[];
  }) {
    this.paths = paths;
    this.config = config;
    this.modules = modules.map((M: typeof Module) => {
      // @ts-ignore
      return new M({ api: this });
    });
  }
  getApi(): Api {
    return this;
  }
  setCliName(cli: string) {
    this.cliName = cli;
  }
  getModules() {
    return this.modules;
  }
  setup() {
    this.getModules().forEach((mod) => {
      mod.setup();
    });
  }
  getMakoPlugin(): JsHooks[] {
    return this.getModules()
      .map((mod) => {
        return mod.getMakoPlugin();
      })
      .filter(Boolean) as JsHooks[];
  }
}
