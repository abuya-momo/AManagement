import {
  queryDeviceTypes,
  queryDeviceType,
} from '../services/deviceType';

export default {
  namespace: 'deviceType',

  state: {
    deviceTypeList: [],
    deviceType: {}
  },

  effects: {
    *fetchDeviceTypes(_, { call, put }) {
      const response = yield call(queryDeviceTypes);
      let deviceTypes = response.deviceTypes;
      yield put({
        type: 'saveDeviceTypes',
        payload: ((deviceTypes && Array.isArray(deviceTypes)) ? deviceTypes : [])
      });
    },
    *fetchDeviceType({ payload }, { call, put }) {
      const response = yield call(queryDeviceType, payload);
      yield put({
        type: 'saveDeviceType',
        payload: Array.isArray(response) ? response : [],
      });
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
        deviceType: action.payload,
      };
    },
  },
};
