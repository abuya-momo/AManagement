import { routerRedux } from 'dva/router';
import {
  query,
  submitAdd,
  submitEdit,
  submitDelete,
} from '../services/manager';
import { message } from 'antd';
import moment from 'moment';

export default {
  namespace: 'manager',

  state: {
    id: null,
    name: null,
    brand: null,
    start_time: null,
    if_deleted: null,
    delete_time: null,
    loading: false,
  },

  effects: {
    *fetchManager({ payload }, { call, put }) {
      console.log('fetchManager ' + payload);
      yield put({
        type: 'loading',
        payload: null,
      });
      const response = yield call(query, payload);
      console.log(response);
      yield put({
        type: 'saveBrand',
        payload: {
          manager: response.manager ? response.manager : {},
        }
      });
      yield put({
        type: 'loadFinish',
        payload: null,
      });
      if (!response.manager.id) {
        message.info('未找到相关信息');
      }
    },
    *submitAddManager({ payload }, { call, put }) {
      console.log('submitAddManager');
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
    *submitDeleteManager({ payload }, { call, put }) {
      console.log('submitDeleteManager');
      var response = yield call(submitDelete, payload);
      if (response.success) {
        message.success('提交成功');
        yield put(routerRedux.push('/brand/brand-list')); // 提交成功后页面跳转
      } else {
        message.error('提交失败');
        return true;
      }
    },
  },

  reducers: {
    saveManager(state, action) {
      return {
        ...state,
        ...action.payload.manager,
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
