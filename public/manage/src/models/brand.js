import { routerRedux } from 'dva/router';
import {
  query,
  submitAdd,
  submitEdit,
} from '../services/brand';
import { message } from 'antd';
import moment from 'moment';

export default {
  namespace: 'brand',

  state: {
    id: null,
    brand_name: null,
    slogan: null,
    brand_description: null,
    brand_icon: null,
    loading: false,
  },

  effects: {
    *fetchBrand({ payload }, { call, put }) {
      console.log('fetchBrand ' + payload);
      yield put({
        type: 'loading',
        payload: null,
      });
      const response = yield call(query, payload);
      console.log(response);
      yield put({
        type: 'saveBrand',
        payload: {
          brand: response.brand ? response.brand : {},
        }
      });
      yield put({
        type: 'loadFinish',
        payload: null,
      });
      if (!response.brand.id) {
        message.info('未找到相关信息');
      }
    },
    *submitAddBrand({ payload }, { call, put }) {
      console.log('dsfdgyjhj');
      var response = yield call(submitAdd, payload);
      if (response.success) {
        message.success('提交成功');
        yield put(routerRedux.push('/brand/brand-list')); // 提交成功后页面跳转
      } else {
        message.error('提交失败');
        return true;
      }
    },
    *submitEditBrand({ payload }, { call, put }) {
      console.log(payload);
      var response = yield call(submitEdit, payload);
      console.log(response);
      if (response.success) {
        message.success('提交成功');
        yield put(routerRedux.push(`/brand/brand/${payload.id}`));
      } else {
        message.error('提交失败');
        return true;
      }
    },
  },

  reducers: {
    saveBrand(state, action) {
      return {
        ...state,
        ...action.payload.brand,
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
