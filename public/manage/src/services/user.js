import request from '../utils/request';

export async function query() {
  return request('/api/user');
}

export async function queryCurrent() {
  return request('/api/currentUser');
}

export async function manageLogin(params) {
  console.log('manageLogin');
  return request('/manage/manage_login', {
    method: 'POST',
    body: params,
  });
}
