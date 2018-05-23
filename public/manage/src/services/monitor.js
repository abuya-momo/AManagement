import request from '../utils/request';

export async function queryMonitor(params) {
  return request(`/manage/monitor?brandId=${params.brandId}&date=${params.date}`, {
    method: 'GET',
    mode: 'same-origin',
  });
}

export async function queryMonitorDAUs(params) {
  return request(`/manage/monitor_DAUs?brandId=${params.brandId}&startDate=${params.startDate}&lastDate=${params.lastDate}`, {
    method: 'GET',
    mode: 'same-origin',
  });
}
