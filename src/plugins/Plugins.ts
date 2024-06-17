import { JsHooks } from '@umijs/mako/binding';
import { Paths } from '../utils/path';
import { Module } from './Module';

export class Plugins {
  public paths: Paths;
  public name: string = '';
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
      return new M({ paths });
    });
  }
  setup() {
    this.modules.forEach((mod) => {
      mod.setup();
    });
  }
  getMakoPlugin(): JsHooks[] {
    return this.modules
      .map((mod) => {
        return mod.getMakoPlugin();
      })
      .filter(Boolean) as JsHooks[];
  }
}
