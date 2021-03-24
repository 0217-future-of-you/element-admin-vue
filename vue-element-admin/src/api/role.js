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
/**获取角色 */
export function GetData(data){
  return request({
    url: '/Base_Manage/Base_Role/GetDataList',
    method: 'post',
    data
  })
}

/**获取单个角色信息 */
export function GetTheData(data){
  return request({
    url: '/Base_Manage/Base_Role/GetTheData',
    method: 'post',
    data
  })
}

/**删除角色 */
export function deleteData(data){
  return request({
    url: '/Base_Manage/Base_Role/DeleteData',
    method: 'post',
    data
  })
}

export function SaveData(data) {
  return request({
    url: '/Base_Manage/Base_Role/SaveData',
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
