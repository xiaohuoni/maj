import { installDeps } from '@umijs/utils';
import { cac } from 'cac';
import { VERSION } from './constants';
import { Api } from './plugins/Api';
import Aconsole from './plugins/aconsole';
import Dva from './plugins/dva';
import Hd from './plugins/hd';
import Keepalive from './plugins/keepalive';
import MobileLayout from './plugins/mobilelayout';
import Model from './plugins/model';
import Routes from './plugins/routes';
import { getConfig } from './utils/getConfig';
import { getPaths, winJoin } from './utils/path';

const cli = cac('maj');
const processArgs = process.argv;
const command = processArgs.slice(2)[0];
const cwd = process.cwd();
const paths = getPaths({
  cwd,
  env: 'development' as any,
  prefix: 'maj',
});

const config = getConfig(cwd);

// api
const api = new Api({
  paths,
  config,
  modules: [Routes, Model, Keepalive, Aconsole, Hd, MobileLayout, Dva],
});
api.setCliName(command);
// process.env.NODE_ENV = 'development';
// process.env.NODE_ENV = 'production';

cli
  .command('install', '初始化项目')
  .alias('i')
  .alias('init')
  .action(async () => {
    try {
      // 安装依赖
      const deps = api.getInstallDependencies();
      installDeps({ opts: deps, cwd });
      // 其他需要前置的操作
    } catch (e) {
      console.error(e);
      process.exit(1);
    } finally {
    }
  });

cli.command('setup', '重置缓存文件').action(async () => {
  try {
    api.setup();
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
  }
});

// dev
cli
  .command('dev', '开发服务')
  .alias('start')
  .action(async () => {
    const { dev } = require('./dev');
    try {
      api.setup();
      await dev({ api });
    } catch (e) {
      console.error(e);
      process.exit(1);
    } finally {
    }
  });

cli
  .command('build', '构建项目')
  .alias('b')
  .action(async () => {
    const { build } = require('./build');
    try {
      api.setup();
      await build({ api });
    } catch (e) {
      console.error(e);
      process.exit(1);
    } finally {
    }
  });
// mock
cli
  .command('mock', '静态数据服务')
  .option('--mockDir <dir>', `[string] mock directory (default: mock)`)
  .action(async (options) => {
    const { mockDir } = options;
    const { mock } = require('./mock');
    try {
      const dir = winJoin(process.cwd(), mockDir || 'mock');
      await mock({ paths, mockDir: dir, config });
    } catch (e) {
      console.error(e);
      process.exit(1);
    } finally {
    }
  });

cli.help();
cli.version(VERSION);

cli.parse();
