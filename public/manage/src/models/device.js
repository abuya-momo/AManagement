import { routerRedux } from 'dva/router';
import {
  queryDeviceInfo
} from '../services/device';
import { message } from 'antd';
import moment from 'moment';

export default {
  namespace: 'device',

  state: {
    id: null,
    count: null,
    start_time: null,
    mac: null,
    state: null,
    model: null,
    type_name: null,
    type_profile: null,
    type_pic: null,
    binded_users: [],
    loading: false,
  },

  effects: {
    *fetchDeviceInfo({ payload }, { call, put }) {
      console.log('fetchDeviceInfo' + payload);
      yield put({
        type: 'loading',
        payload: null,
      });
      const response = yield call(queryDeviceInfo, payload.param, payload.paramType);
      console.log(response);
      yield put({
        type: 'saveDevice',
        payload: {
          device: response.device ? response.device : {},
          users: response.users ? response.users : [],
        }
      });
      yield put({
        type: 'loadFinish',
        payload: null,
      });
      if (!response.device.id) {
        message.info('未找到相关信息');
      }
    },
  },

  reducers: {
    saveDevice(state, action) {
      if (action.payload.device.start_time) {
        console.log('action.payload.start_sell_time');
        return {
          ...state,
          ...action.payload.device,
          binded_users: action.payload.users,
          start_time: moment(action.payload.device.start_time).format('YYYY-MM-DD HH:mm:ss'),
        };
      }
      return {
        ...state,
        ...action.payload.device,
        binded_users: action.payload.users,
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
