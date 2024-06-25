import { cac } from 'cac';
import { VERSION } from './constants';
import { Plugins } from './plugins/Plugins';
import Aconsole from './plugins/aconsole';
import Hd from './plugins/hd';
import Keepalive from './plugins/keepalive';
import Model from './plugins/model';
import Routes from './plugins/routes';
import { getPaths, winJoin } from './utils/path';

const cli = cac('maj');
const processArgs = process.argv;
const command = processArgs.slice(2)[0];

const paths = getPaths({
  cwd: process.cwd(),
  env: 'development' as any,
  prefix: 'maj',
});

// plugins
const plugins = new Plugins({
  paths,
  modules: [Routes, Model, Keepalive, Aconsole, Hd],
});
plugins.setCliName(command);
// process.env.NODE_ENV = 'development';
// process.env.NODE_ENV = 'production';

cli
  .command('setup', '初始化项目')
  .alias('init')
  .action(async () => {
    try {
      plugins.setup();
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
      plugins.setup();
      await dev({ paths, plugins });
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
      plugins.setup();
      await build({ paths, plugins });
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
      await mock({ paths, mockDir: dir });
    } catch (e) {
      console.error(e);
      process.exit(1);
    } finally {
    }
  });

cli.help();
cli.version(VERSION);

cli.parse();
