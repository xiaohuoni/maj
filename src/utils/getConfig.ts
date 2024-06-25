import { existsSync, readFileSync } from 'fs';
import { join } from 'path';
import { DEFAULT_CONFIG_FILE } from '../constants';

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
