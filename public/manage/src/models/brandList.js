import { routerRedux } from 'dva/router';
import {
  queryBrands,
} from '../services/brand';
import { message } from 'antd';

export default {
  namespace: 'brandList',

  state: {
    list: [],
    currentPage: null,
    pageSize: null
  },

  effects: {
    *fetchBrands(_, { call, put }) {
      const response = yield call(queryBrands);
      console.log(response);
      let brands = response.brands;
      yield put({
        type: 'saveBrands',
        payload: ((brands && Array.isArray(brands)) ? brands : []),
      });
      return true;
    },
  },

  reducers: {
    saveBrands(state, action) {
      return {
        list: [
          ...action.payload,
        ],
      };
    },
  },
};
