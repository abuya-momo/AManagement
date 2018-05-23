import {
  queryMonitor,
  queryMonitorDAUs,
} from '../services/monitor';
import { message } from 'antd';

export default {
  namespace: 'monitor',

  state: {
    monitorState: [],
    DAUList: [],
    tags: [],
    loading: false,
  },

  effects: {
    *fetchMonitorState({ payload }, { call, put }) {
      console.log(payload);
      yield put({
        type: 'loading',
        payload: null,
      });
      const response = yield call(queryMonitor, payload);
      const monitorState = response.state;

      yield put({
        type: 'saveMonitorState',
        payload: ((monitorState && Array.isArray(monitorState)) ? monitorState : []),
      });
      yield put({
        type: 'loadFinish',
        payload: null,
      });
      if (!monitorState || monitorState.length == 0) {
        message.info('未找到相关信息');
      }
    },
    *fetchDAUs({ payload }, { call, put }) {
      const response = yield call(queryMonitorDAUs, payload);
      let DAUs = response.DAUs;
      yield put({
        type: 'saveDAUs',
        payload: ((DAUs && Array.isArray(DAUs)) ? DAUs : []),
      });
      return true;
    },
  },

  reducers: {
    saveMonitorState(state, action) {
      return {
        ...state,
        monitorState: [
          ...action.payload,
        ],
      };
    },
    saveDAUs(state, action) {
      return {
        ...state,
        DAUList: [
          ...action.payload,
        ],
      };
    },
    loading(state, action) {
      return {
        ...state,
        loading: true,
      }
    },
    loadFinish(state, action) {
      return {
        ...state,
        loading: false,
      }
    },
  },
};
