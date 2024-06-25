import type { DvaModel } from 'src/.maj/dva/types';
import { query } from 'src/services/api';

export interface HelloModelState {
  name: string;
}

const HelloModel: DvaModel<HelloModelState> = {
  namespace: 'hello',

  state: {
    name: 'Hello Alita',
  },

  effects: {
    *query({ payload }, { call, put }) {
      const data = yield call(query, payload);
      yield put({
        type: 'save',
        payload: { name: data.text },
      });
    },
  },
  reducers: {
    save(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
};

export default HelloModel;
