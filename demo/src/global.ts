import { OnionMiddleware, setRequestConfig } from '@alita/request';

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
