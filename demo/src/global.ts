import { OnionMiddleware, setRequestConfig } from '@alita/request';
import 'src/.maj/hd/hd';
const middleware: OnionMiddleware = async (ctx, next) => {
  await next();
  const { data } = ctx.res;
  if (data) {
    ctx.res = data;
  }
};

setRequestConfig({
  prefix: '',
  method: 'get',
  middlewares: [middleware],
  errorHandler: (error) => {
    // 集中处理错误
    console.log(11111111);
    console.log(error);
  },
});

if ((window as any).VConsole) new (window as any).VConsole({});
