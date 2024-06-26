import { parseModule } from '@umijs/bundler-utils';
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';
import { DEFAULT_CONFIG_FILE } from '../constants';
import { Paths } from './path';
export interface MajConfig {
  skipPlugins?: string[];
  resolve?: {
    alias?: Record<string, string>;
    extensions?: string[];
  };
  px2rem?:
    | false
    | {
        root?: number;
        propBlackList?: string[];
        propWhiteList?: string[];
        selectorBlackList?: string[];
        selectorWhiteList?: string[];
      };
  port?: number;
  // 真实的 antd-mobile 路径，用于兼容 2 和 5 共用的场景
  antdMobile?: string;
}

export function getConfig(cwd: string): MajConfig {
  let config: MajConfig = {};
  const configPath = join(cwd, DEFAULT_CONFIG_FILE);
  if (existsSync(configPath)) {
    config = JSON.parse(readFileSync(configPath, 'utf-8'));
  }
  config.resolve = config.resolve ?? {};
  config.resolve.alias = config.resolve.alias ?? {};
  return config;
}
export function expandJSPaths(path: string) {
  return ['.js', '.jsx', '.ts', '.tsx'].map((ext) => {
    return `${path}${ext}`;
  });
}

export async function getAppJsInfo(paths: Paths, fileName: string = 'runtime') {
  for (const path of expandJSPaths(join(paths.absSrcPath, fileName))) {
    if (existsSync(path)) {
      const [_, exports] = await parseModule({
        path,
        content: readFileSync(path, 'utf-8'),
      });
      return {
        path,
        exports,
      };
    }
  }
  return { path: '', exports: [] };
}
