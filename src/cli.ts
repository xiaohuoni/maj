import { cac } from 'cac';
import { VERSION } from './constants';
import { Api } from './plugins/Api';
import Aconsole from './plugins/aconsole';
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
  modules: [Routes, Model, Keepalive, Aconsole, Hd, MobileLayout],
});
api.setCliName(command);
// process.env.NODE_ENV = 'development';
// process.env.NODE_ENV = 'production';

cli
  .command('setup', '初始化项目')
  .alias('init')
  .action(async () => {
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
