import request from '../utils/request';

export async function queryBrands() {
  return request('/manage/brands', {
    method: 'GET',
    mode: 'same-origin',
  });
}

export async function query(brandId) {
  return request(`/manage/brand?id=${brandId}`, {
    method: 'GET',
    mode: 'same-origin',
  });
}

export async function submitAdd(params) {
  return request('/manage/add_brand', {
    method: 'POST',
    body: params,
  });
}

export async function submitEdit(params) {
  return request('/manage/edit_brand', {
    method: 'POST',
    body: params,
  });
}
