import request from '../utils/request';

export async function queryUserInfo(param, paramType) {
  return request(`/manage/user?param=${param}&paramType=${paramType}`, {
    method: 'GET',
    mode: 'same-origin',
  });
}
