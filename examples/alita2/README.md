## 修改依赖

```diff
- "alita": "workspace:*",
+ "maj": "workspace:*",
```

## 修改 tsconfig

```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "baseUrl": "./"
  },
  "include": ["src", "typings.d.ts"]
}
```

## 修改别名

@ 改成 src ，为了兼容 crate-react-app

## 修改引用

因为暂时为实现 import all from umi 所以要改动的还比较多，但都不难，只要知道来自谁就好改

```diff
- import { Effect, Reducer } from 'alita';
+ import { Effect, Reducer } from 'src/.maj/dva/types';

- import { request } from 'alita';
+ import { request } from '@alita/request';

- import {
-   connect,
-   ConnectProps,
-   dropByCacheKey,
-   ListModelState,
-   setPageNavBar,
- } from 'alita';
+ import { connect } from 'src/.maj/dva';
+ import { ConnectProps, ListModelState } from 'src/.maj/dva/types';
+ import { dropByCacheKey } from 'src/.maj/keepalive';
+ import { setPageNavBar } from 'src/.maj/mobilelayout';
```

## 修改运行时配置文件 app.ts -> runtime.ts

### 将 request 配置转移到 global

因为 request 是一个单例，所以是不是运行时配置，意义不大

```
export const request: RequestConfig = {
  prefix: '',
  method: 'post',
  errorHandler: (error: ResponseError) => {
    // 集中处理错误
    console.log(error);
  },
};
```

```

const middleware: OnionMiddleware = async (ctx, next) => {
  await next();
  const { data } = ctx.res;
  if (data) {
    ctx.res = data;
  }
};

setRequestConfig({
  prefix: '',
  method: 'post',
  middlewares: [middleware],
  errorHandler: (error) => {
    // 集中处理错误
    console.log(11111111);
    console.log(error);
  },
});
```

## 修改执行命令

```diff
- "dev": "alita dev",
- "build": "alita build"
+ "dev": "maj dev",
+ "build": "maj build"
```

## 安装额外依赖

pnpm i @alita/request antd-mobile-icons dva-umi-lib fast-deep-equal react react-dom react-router-dom

## 增加项目主入口

/public/index.html

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Mako App</title>
    <script src="https://unpkg.com/vconsole@latest/dist/vconsole.min.js"></script>
  </head>

  <body>
    <div id="root"></div>
    <script src="/index.js"></script>
    <link href="/index.css" rel="stylesheet" />
  </body>
</html>
```

alita2/src/App.tsx

```tsx
import { Suspense } from 'react';
import { HashRouter, useLocation, useRoutes } from 'react-router-dom';
import { RootContainer } from 'src/.maj/dva/dva';
import { KeepAliveLayout, useKeepOutlets } from 'src/.maj/keepalive';
import AlitaLayout from 'src/.maj/mobilelayout/AlitaLayout';
import { ProviderWrapper } from 'src/.maj/model/runtime';
import routes from 'src/.maj/routes';
function Layout() {
  const outlets = useKeepOutlets();
  return <>{outlets}</>;
}
console.log(routes);
function Routes() {
  const location = useLocation();
  let element = useRoutes([
    {
      path: '/',
      element: <Layout />,
      children: routes.map((route) => ({
        path: route.path,
        element: <route.component location={location} />,
      })),
    },
  ]);
  return <>{element}</>;
}
function App() {
  return (
    <HashRouter>
      <AlitaLayout>
        <ProviderWrapper>
          <KeepAliveLayout>
            <RootContainer>
              <Suspense>
                <Routes />
              </Suspense>
            </RootContainer>
          </KeepAliveLayout>
        </ProviderWrapper>
      </AlitaLayout>
    </HashRouter>
  );
}

export { App };
```

alita2/src/index.tsx

```ts
import { createRoot } from 'react-dom/client';
import { App } from './App';
import './global';
import './global.css';

const root = createRoot(document.getElementById('root')!);
root.render(<App />);
```
