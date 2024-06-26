import * as t from '@umijs/bundler-utils/compiled/babel/types';
import { winPath } from '@umijs/utils';
import { extname } from 'path';
import { Api as IApi } from '../Api';
import { Module } from '../Module';
import { ModelUtils } from './modelUtils';

function isModelObject(node: t.Node) {
  return (
    t.isObjectExpression(node) &&
    node.properties.some((property) => {
      return [
        'state',
        'reducers',
        'subscriptions',
        'effects',
        'namespace',
      ].includes((property as any).key.name);
    })
  );
}
export function getModelUtil(api: IApi | null) {
  return new ModelUtils(api, {
    contentTest(content) {
      return content.startsWith('// @dva-model');
    },
    astTest({ node, content }) {
      if (isModelObject(node)) {
        return true;
      } else if (
        content.includes('dva-model-extend') &&
        t.isCallExpression(node) &&
        node.arguments.length === 2 &&
        isModelObject(node.arguments[1])
      ) {
        return true;
      }
      return false;
    },
  });
}

export function getAllModels(api: IApi) {
  return getModelUtil(api).getAllModels({
    extraModels: [],
  });
}

// TODO: support immer
export default class Dva extends Module {
  constructor(opts: any) {
    super(opts);
    this.name = 'dva';
  }
  async generateFiles() {
    const models = getAllModels(this.api);

    // models.ts
    this.writeTmpFile({
      path: 'models.ts',
      content: ModelUtils.getModelsContent(models),
    });

    const hasRuntime = this.api.runtimeJS?.exports?.includes('dva');
    // dva.tsx
    this.writeTmpFile({
      path: 'dva.tsx',
      tpl: `
// It's faked dva
// aliased to @umijs/plugins/templates/dva
import { create, Provider, createLoading } from 'dva-umi-lib';
// TODO: support immer
import React, { useRef } from 'react';
import { models } from './models';
${hasRuntime ? "import { dva } from 'src/runtime';" : ''}
let dvaApp: any;
// TODO: support history
const history = {}
export function RootContainer(props: any) {
  const app = useRef<any>();
  const runtimeDva = ${hasRuntime ? 'dva || ' : ''}{};
  if (!app.current) {
    app.current = create(
      {
        history,
        ...(runtimeDva.config || {}),
      },
      {
        initialReducer: {},
        setupMiddlewares(middlewares: Function[]) {
          return [...middlewares];
        },
        setupApp(app: any) {
          app._history = history;
        },
      },
    );
    dvaApp = app.current;
    app.current.use(createLoading());
    // TODO: support immer
    (runtimeDva.plugins || []).forEach((p) => {
      app.current.use(p);
    });
    for (const id of Object.keys(models)) {
      app.current.model({
        namespace: models[id].namespace,
        ...models[id].model,
      });
    }
    app.current.start();
  }
  return <Provider store={app.current!._store}>{props.children}</Provider>;
}

export function getDvaApp() {
  return dvaApp;
}
      `,
      context: {},
    });

    // runtime.tsx
    this.writeTmpFile({
      path: 'runtime.tsx',
      content: `
import React from 'react';
import { RootContainer } from './dva';

export function dataflowProvider(container, opts) {
  return React.createElement(RootContainer, opts, container);
}
      `,
    });

    // index.ts for export
    this.writeTmpFile({
      path: 'index.ts',
      content: `
export { connect, useDispatch, useStore, useSelector } from 'dva-umi-lib';
export { getDvaApp } from './dva';
`,
    });

    // types.ts
    this.writeTmpFile({
      path: 'types.d.ts',
      tpl: `
import type { History } from 'react-router-dom';

export interface ConnectProps {
      dispatch?: Dispatch;
      // 兼容 alita2
      match?: any;
      location?: any;
      history?: History;
      route?: any;
      routes?: any;
}
type RequiredConnectProps = Required<ConnectProps>
export type ConnectRC<
      T = {},
      > = React.ForwardRefRenderFunction<any, T & RequiredConnectProps>;
interface Action<T = any> {
      type: T
}
interface AnyAction extends Action {
      // Allows any extra properties to be defined in an action.
      [extraProps: string]: any
}
interface Dispatch<A extends Action = AnyAction> {
      <T extends A>(action: T): T
}
interface EffectsCommandMap {
      put: <A extends AnyAction>(action: A) => any,
      call: Function,
      select: Function,
      take: Function,
      cancel: Function,
      [key: string]: any,
}
interface Action<T = any> {
      type: T
}
export type Reducer<S = any, A extends Action = AnyAction> = (prevState: S, action: A) => S;
export type Effect = (action: AnyAction, effects: EffectsCommandMap) => void;
type EffectType = 'takeEvery' | 'takeLatest' | 'watcher' | 'throttle';
type EffectWithType = [Effect, { type: EffectType }];
export type Subscription = (api: SubscriptionAPI, done: Function) => void;

export interface ReducersMapObject<T> {
      [key: string]: Reducer<T>,
}
export interface EffectsMapObject {
      [key: string]: Effect | EffectWithType,
}
export interface SubscriptionAPI {
      dispatch: Dispatch<any>,
}
export interface SubscriptionsMapObject {
      [key: string]: Subscription,
}
export interface DvaModel<T, E = EffectsMapObject, R = ReducersMapObject<T>> {
      namespace: string,
      state?: T,
      reducers?: R,
      effects?: E,
      subscriptions?: SubscriptionsMapObject,
}
${models
  .map((model: { file: string; namespace: string }) => {
    const { file, namespace } = model;
    // prettier-ignore
    // export type { IndexModelState } from 'src/models/index';
    return `export type { ${namespace.replace(/( |^)[a-z]/g, (L) => L.toUpperCase())}ModelState } from '${winPath(file.replace(extname(file), ''))}';`;
  })
  .join('\r\n')}
      `,
      context: {},
    });
  }
  getInstallDependencies() {
    return {
      dependencies: ['dva-umi-lib'],
    };
  }
}
