import request from '@/utils/request'

 /**
  * 获取部门列表/
  * @param {*} data 
  */
 export function getDepartment(data) {
    return request({
      url: '/Base_Manage/Base_Department/GetDataList',
      method: 'post',
      data
    })
  }


  /**
  * 获取树形部门列表/Base_Manage/Base_Department/GetTheData
  * @param {*} data 
  */
 export function getTreeDepartment(data) {
    return request({
      url: '/Base_Manage/Base_Department/GetTreeDataList',
      method: 'post',
      data
    })
  }

    /**
  * 获取树形部门列表【id】
  * @param {*} data 
  */
 export function getTheDepartment(data) {
    return request({
      url: '/Base_Manage/Base_Department/GetTheData',
      method: 'post',
      data
    })
  }
      /**
  * 保存
  * @param {*} data 
  */
 export function saveData(data) {
  return request({
    url: '/Base_Manage/Base_Department/SaveData',
    method: 'post',
    data
  })
}

      /**
  * 删除部门
  * @param {*} data 
  */
 export function DeleteDepartment(data) {
    return request({
      url: '/Base_Manage/Base_Department/DeleteData',
      method: 'post',
      data
    })
  }