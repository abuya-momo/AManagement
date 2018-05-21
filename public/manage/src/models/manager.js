import { routerRedux } from 'dva/router';
import {
  queryUserInfo
} from '../services/searchUser';
import { message } from 'antd';
import moment from 'moment';

export default {
  namespace: 'manager',

  state: {
    managers: [],
    loading: false,
  },

  effects: {
    *fetchManagers({ payload }, { call, put }) {
      console.log('fetchDeviceInfo' + payload);
      yield put({
        type: 'loading',
        payload: null,
      });
      const response = yield call(queryUserInfo, payload.param, payload.paramType);
      console.log(response);
      yield put({
        type: 'saveUserInfo',
        payload: {
          user: response.user ? response.user : {},
        }
      });
      yield put({
        type: 'loadFinish',
        payload: null,
      });
      if (!response.user.id) {
        message.info('未找到相关信息');
      }
    },
  },

  reducers: {
    saveUserInfo(state, action) {
      console.log(action.payload);
      return {
        ...state,
        ...action.payload.user,
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
    }
  },
};
