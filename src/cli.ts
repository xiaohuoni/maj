import { cac } from 'cac';
import { VERSION } from './constants';
import { Plugins } from './plugins/Plugins';
import Keepalive from './plugins/keepalive';
import Model from './plugins/model';
import Routes from './plugins/routes';
import { getPaths } from './utils/path';

const cli = cac('maj');

// process.env.NODE_ENV = 'development';
// process.env.NODE_ENV = 'production';
// dev
cli
  .command('dev', '开发服务')
  .alias('start')
  .action(async () => {
    console.log('start dev');
    const { dev } = require('./dev');
    try {
      const paths = getPaths({
        cwd: process.cwd(),
        env: 'development' as any,
        prefix: 'maj',
      });
      // plugins
      const plugins = new Plugins({
        paths,
        modules: [Routes, Model, Keepalive],
      });
      plugins.setup();
      await dev({ paths, watch: true, plugins });
    } catch (e) {
      console.error(e);
      process.exit(1);
    } finally {
    }
  });

cli.help();
cli.version(VERSION);

cli.parse();
