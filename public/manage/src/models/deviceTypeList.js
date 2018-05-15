import { routerRedux } from 'dva/router';
import {
  queryDeviceTypes,
} from '../services/deviceType';
import { message } from 'antd';

export default {
  namespace: 'deviceTypeList',

  state: {
    list: [],
    currentPage: null,
    pageSize: null
  },

  effects: {
    *fetchDeviceTypes(_, { call, put }) {
      const response = yield call(queryDeviceTypes);
      let deviceTypes = response.deviceTypes;
      yield put({
        type: 'saveDeviceTypes',
        payload: ((deviceTypes && Array.isArray(deviceTypes)) ? deviceTypes : []),
      });
      return true;
    },
  },

  reducers: {
    saveDeviceTypes(state, action) {
      return {
        list: [
          ...action.payload,
        ],
      };
    },
  },
};
