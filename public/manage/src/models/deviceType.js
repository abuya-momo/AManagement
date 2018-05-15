import { routerRedux } from 'dva/router';
import {
  queryDeviceTypes,
  queryDeviceType,
  submitAdd
} from '../services/deviceType';
import { message } from 'antd';

export default {
  namespace: 'deviceType',

  state: {
  },

  effects: {
    *fetchDeviceTypes(_, { call, put }) {
      const response = yield call(queryDeviceTypes);
      let deviceTypes = response.deviceTypes;
      yield put({
        type: 'saveDeviceTypes',
        payload: ((deviceTypes && Array.isArray(deviceTypes)) ? deviceTypes : []),
      });
    },
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
    saveDeviceTypes(state, action) {
      return {
        ...state,
        deviceTypeList: action.payload,
      };
    },
    saveDeviceType(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
};
