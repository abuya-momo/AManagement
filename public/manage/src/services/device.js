import request from '../utils/request';

export async function query(deviceId) {
  return request(`/app_api/device?id=${deviceId}`, {
    method: 'GET',
    mode: 'same-origin',
  });
}
