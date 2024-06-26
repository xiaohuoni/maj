import { JsHooks } from '@umijs/mako/binding';
import { fsExtra } from '@umijs/utils';
import { MajConfig } from '../utils/getConfig';
import { Paths } from '../utils/path';
import { IInstallDeps, Module } from './Module';

export class Api {
  public paths: Paths;
  public name: string = '';
  public cliName: string = '';
  public modules: Module[];
  public config: MajConfig;
  public skipPlugins: string[];
  public runtimeJS: {
    path?: string;
    exports?: readonly string[];
  };
  constructor({
    paths,
    modules = [],
    config,
    skipPlugins = [],
    runtimeJS,
  }: {
    paths: Paths;
    config: MajConfig;
    skipPlugins?: string[];
    modules: (typeof Module)[];
    runtimeJS: {
      path?: string;
      exports?: readonly string[];
    };
  }) {
    this.paths = paths;
    this.config = config;
    this.skipPlugins = skipPlugins;
    this.runtimeJS = runtimeJS;
    this.modules = modules.map((M: typeof Module) => {
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
    return this.modules.filter((m) => {
      return !this.skipPlugins.includes(m.name);
    });
  }
  setup() {
    // clear
    // 先清空缓存目录 this.paths.absTmpPath
    fsExtra.emptyDirSync(this.paths.absTmpPath);
    this.getModules().forEach((mod) => {
      mod.setup();
    });
  }
  check() {
    this.getModules().forEach((mod) => {
      mod.check();
    });
  }
  getMakoPlugin(): JsHooks[] {
    return this.getModules()
      .map((mod) => {
        return mod.getMakoPlugin();
      })
      .filter(Boolean) as JsHooks[];
  }
  getInstallDependencies() {
    const result: IInstallDeps = {};

    this.getModules()
      .map((mod) => {
        return mod.getInstallDependencies();
      })
      .filter(Boolean)
      .forEach((item) => {
        if (item.dependencies) {
          result.dependencies = [
            ...new Set([...(result.dependencies || []), ...item.dependencies]),
          ];
        }
        if (item.devDependencies) {
          result.devDependencies = [
            ...new Set([
              ...(result.devDependencies || []),
              ...item.devDependencies,
            ]),
          ];
        }
      });

    return result;
  }
}
