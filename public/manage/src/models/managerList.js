import { routerRedux } from 'dva/router';
import {
  queryManagers
} from '../services/manager';
import { message } from 'antd';
import moment from 'moment';

export default {
  namespace: 'managerList',

  state: {
    list: [],
    currentPage: null,
    pageSize: null
  },

  effects: {
    *fetchManagers({ payload }, { call, put }) {
      console.log('fetchManagers' + payload);
      const response = yield call(queryManagers);
      console.log(response);
      let managers = response.managers;
      yield put({
        type: 'saveManagers',
        payload: ((managers && Array.isArray(managers)) ? managers : []),
      });
      return true;
    },
  },

  reducers: {
    saveManagers(state, action) {
      console.log(action.payload);
      return {
        ...state,
        list: [
          ...action.payload,
        ],
      };
    },
  },
};
