import request from '@/utils/request'

/**获取菜单 */
export function GetDataList(data) {
    return request({
      url: '/Base_Manage/Base_Action/GetMenuTreeList',
      method: 'post',
      data
    })
  }
  /**保存菜单 */
  export function saveData(data) {
    return request({
      url: '/Base_Manage/Base_Action/SaveData',
      method: 'post',
      data
    })
  }
  /**保存菜单 */
  export function GetTheData(data) {
    return request({
      url: '/Base_Manage/Base_Action/GetTheData',
      method: 'post',
      data
    })
  }

  /**获取权限值 */
  export function GetPermissionList(data){
    return request({
      url: '/Base_Manage/Base_Action/GetPermissionList',
      method: 'post',
      data
    })
  }
    /**获取树形菜单 */
 export function GetActionTreeList(data) {
      return request({
        url: '/Base_Manage/Base_Action/GetActionTreeList',
        method: 'post',
        data
      })
   }
 

    /**删除菜单 */
    export function deleteData(data) {
      return request({
        url: '/Base_Manage/Base_Action/DeleteData',
        method: 'post',
        data
      })
    }