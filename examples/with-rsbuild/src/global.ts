import { OnionMiddleware, setRequestConfig } from '@alita/request';
import 'antd-mobile/es/global';
import 'src/.maj/hd/hd';

const middleware: OnionMiddleware = async (ctx, next) => {
  await next();
  const { data } = ctx.res;
  if (data) {
    ctx.res = data;
  }
};

const prefix = 'http://localhost:1021';

setRequestConfig({
  prefix,
  method: 'get',
  middlewares: [middleware],
  errorHandler: (error) => {
    // 集中处理错误

    console.log(error);
  },
});

if ((window as any).VConsole) new (window as any).VConsole({});
