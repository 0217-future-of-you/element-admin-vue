import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/Base_Manage/Home/SubmitLogin',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: '/Base_Manage/Home/GetOperatorInfo',
    method: 'post',
    // params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-element-admin/user/logout',
    method: 'post'
  })
}

 /**
  * 获取用户列表
  * @param {*} data 
  */
export function getAllUser(data) {
  return request({
    url: '/Base_Manage/Base_User/GetDataList',
    method: 'post',
    data
  })
}
 /**
  * 添加用户列表
  * @param {*} data 
  */
export function SaveUser(data) {
  return request({
    url: '/Base_Manage/Base_User/SaveData',
    method: 'post',
    data
  })
}
 /**
  * 删除用户列表
  * @param {*} data 
  */
export function DeleteUser(data) {
  return request({
    url: '/Base_Manage/Base_User/DeleteData',
    method: 'post',
    data
  })
}

 /**
  * 获取一个用户
  * @param {*} data 
  */
  export function GetTheData(data) {
    return request({
      url: '/Base_Manage/Base_User/GetTheData',
      method: 'post',
      data
    })
  }