import { cac } from 'cac';
import { VERSION } from './constants';
import { getPaths } from './utils/path';
const cli = cac('maj');

// global options
interface GlobalCLIOptions {
  '--'?: string[];
}
// process.env.NODE_ENV = 'development';
// process.env.NODE_ENV = 'production';
// dev
cli
  .command('dev', '开发服务')
  .alias('start')
  .action(async (root: string, options: GlobalCLIOptions) => {
    console.log('start dev');
    const { dev } = require('./dev');
    try {
      const paths = getPaths({
        cwd: process.cwd(),
        env: 'development' as any,
        prefix: 'maj',
      });
      await dev({ paths, watch: true });
    } catch (e) {
      console.error(e);
      process.exit(1);
    } finally {
    }
  });

cli.help();
cli.version(VERSION);

cli.parse();
