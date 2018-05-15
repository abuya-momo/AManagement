import { routerRedux } from 'dva/router';
import {
  queryDeviceTypes,
  queryDeviceType,
  submitAdd
} from '../services/deviceType';
import { message } from 'antd';
import moment from 'moment';

export default {
  namespace: 'deviceType',

  state: {
  },

  effects: {
    *fetchDeviceType({ payload }, { call, put }) {
      console.log('fetchDeviceType' + payload);
      const response = yield call(queryDeviceType, payload);
      yield put({
        type: 'saveDeviceType',
        payload: response ? response.deviceType : {}
      });
    },
    *submitAddDeviceType({ payload }, { call, put }) {
      payload.start_sell_time = payload.start_sell_time.format("YYYY-MM-DD hh:mm:ss");
      var response = yield call(submitAdd, payload);
      if (response.success) {
        message.success('提交成功');
        yield put(routerRedux.push('/device/device-type-list')); // 提交成功后页面跳转
      } else {
        message.error('提交失败');
        return true;
      }
    },
    *submitEditDeviceType({ payload }, { call, put }) {
      payload.start_sell_time = payload.start_sell_time.format("YYYY-MM-DD hh:mm:ss");
      var response = yield call(submitAdd, payload);
      if (response.success) {
        message.success('提交成功');
        yield put(routerRedux.push(`/device/device-type/${payload.id}`));
      } else {
        message.error('提交失败');
        return true;
      }
    },
  },

  reducers: {
    saveDeviceType(state, action) {
      if (action.payload.start_sell_time) {
        return {
          ...state,
          ...action.payload,
          start_sell_time: moment(action.payload.start_sell_time).format('YYYY-MM-DD HH:mm:ss')
        };
      }
      return {
        ...state,
        ...action.payload,
      };
    },
  },
};
