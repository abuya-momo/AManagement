import { routerRedux } from 'dva/router';
import { message } from 'antd';
import { manageLogin } from '../services/user';
import { setAuthority } from '../utils/authority';
import { reloadAuthorized } from '../utils/Authorized';

export default {
  namespace: 'login',

  state: {
    status: undefined,
  },

  effects: {
    *login({ payload }, { call, put }) {
      let response = yield call(manageLogin, payload);
      if (response.success == true) {
        response.status = 'ok';
        if (response.role == '13') {
          response.role = 'super_admin';
        } else if (response.role == '12') {
          response.role = 'admin';
        } else {
          console.log('error');
          response.status = 'error';
        }
      } else {
        console.log('error');
        response.status = 'error';
      }

      console.log(response);
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });

      // Login successfully
      if (response.success == true) {
        reloadAuthorized();

        yield put({
          type: 'user/saveCurrentUser',
          payload: {
            id: response.id,
            name: response.name,
            brand: response.brand,
          },
        });

        console.log(routerRedux);
        console.log(routerRedux);
        yield put(routerRedux.push('/#/'));

      } else {
        message.error('密码错误');
      }
    },
    *logout(_, { put, select }) {
      try {
        // get location pathname
        const urlParams = new URL(window.location.href);
        const pathname = yield select(state => state.routing.location.pathname);
        // add the parameters in the url
        urlParams.searchParams.set('redirect', pathname);
        window.history.replaceState(null, 'login', urlParams.href);
      } finally {
        yield put({
          type: 'changeLoginStatus',
          payload: {
            status: false,
            currentAuthority: 'guest',
          },
        });
        reloadAuthorized();
        yield put(routerRedux.push('/user/login'));
      }
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.role);
      return {
        ...state,
        status: payload.status,
        type: payload.type,
      };
    },
  },
};
