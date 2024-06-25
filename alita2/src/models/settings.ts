import { Effect, Reducer } from 'src/.maj/dva/types';
import { query } from 'src/services/api';

export interface SettingsModelState {
  name: string;
}

export interface SettingsModelType {
  namespace: 'settings';
  state: SettingsModelState;
  effects: {
    query: Effect;
  };
  reducers: {
    save: Reducer<SettingsModelState>;
  };
}

const SettingsModel: SettingsModelType = {
  namespace: 'settings',

  state: {
    name: '',
  },

  effects: {
    *query({ payload }, { call, put }) {
      const data = yield call(query, payload);
      console.log(data);
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

export default SettingsModel;
