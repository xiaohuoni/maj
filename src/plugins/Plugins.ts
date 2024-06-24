import { JsHooks } from '@umijs/mako/binding';
import { Paths } from '../utils/path';
import { Module } from './Module';

export class Plugins {
  public paths: Paths;
  public name: string = '';
  public cliName: string = '';
  public modules: Module[];

  constructor({
    paths,
    modules = [],
  }: {
    paths: Paths;
    modules: (typeof Module)[];
  }) {
    this.paths = paths;

    this.modules = modules.map((M: typeof Module) => {
      // @ts-ignore
      return new M({ paths, getCliName: this.getCliName.bind(this) });
    });
  }
  getCliName() {
    return this.cliName;
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
