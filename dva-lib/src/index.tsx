// @ts-ignore
import React from 'react';
// @ts-ignore
import { create, saga, utils } from 'dva-core';
// @ts-ignore
import createLoading from 'dva-loading';
import {
  connect,
  Provider,
  useDispatch,
  useSelector,
  useStore,
} from 'react-redux';
export { bindActionCreators } from 'redux';
export {
  connect,
  create,
  createLoading,
  Provider,
  saga,
  useDispatch,
  useSelector,
  useStore,
  utils,
};

export default function dva(opts: any) {
  const app = create(opts, {
    initialReducer: {},
    setupApp() {},
  });
  const oldAppStart = app.start;
  app.router = router;
  app.start = start;
  return app;

  function router(router: any) {
    app._router = router;
  }

  function start(elem: any) {
    // old dva.start() supports passing arguments
    if (typeof elem !== 'undefined') {
      throw new Error('dva.start() should not be called with any arguments.');
    }
    if (!app._store) {
      oldAppStart.call(app);
    }
    const store = app._store;
    const router = app._router;
    return (extraProps: any) => {
      return (
        <Provider store={store}>{router({ app, ...extraProps })}</Provider>
      );
    };
  }
}
