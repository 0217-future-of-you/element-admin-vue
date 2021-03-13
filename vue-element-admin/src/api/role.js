import request from '@/utils/request'

export function getRoutes() {
  return request({
    url: '/Base_Manage/Home/GetOperatorAdminMenuList',
    method: 'post'
  })
}

export function getRoles(data) {
  return request({
    url: '/Base_Manage/Base_Role/GetDataList',
    method: 'post',
    data
  })
}

export function addRole(data) {
  return request({
    url: '/vue-element-admin/role',
    method: 'post',
    data
  })
}

export function updateRole(id, data) {
  return request({
    url: `/vue-element-admin/role/${id}`,
    method: 'put',
    data
  })
}

export function deleteRole(id) {
  return request({
    url: `/vue-element-admin/role/${id}`,
    method: 'delete'
  })
}
