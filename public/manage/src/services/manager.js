import { stringify } from 'qs';
import request from '../utils/request';

export async function queryManagers() {
  return request('/manage/managers');
}

export async function query(id) {
  return request(`/manage/manager?id=${id}`);
}

export async function submitAdd(params) {
  return request('/manage/add_manager', {
    method: 'POST',
    body: params,
  });
}

export async function submitEdit(params) {
  return request('/manage/edit_device_type', {
    method: 'POST',
    body: params,
  });
}

export async function submitDelete(params) {
  return request('/manage/delete_manager', {
    method: 'POST',
    body: params,
  });
}
