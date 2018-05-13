import { stringify } from 'qs';
import request from '../utils/request';

export async function queryDeviceTypes() {
  return request('/manage/device_types');
}

export async function queryDeviceType(deviceTypeId) {
  return request(`/manage/device_type?${stringify(deviceTypeId)}`);
}
