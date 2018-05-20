import request from '../utils/request';

export async function query(deviceId) {
  return request(`/app_api/device?id=${deviceId}`, {
    method: 'GET',
    mode: 'same-origin',
  });
}

export async function queryDeviceInfo(param, paramType) {
  return request(`/manage/device?param=${param}&paramType=${paramType}`, {
    method: 'GET',
    mode: 'same-origin',
  });
}
