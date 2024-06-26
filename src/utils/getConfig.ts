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
