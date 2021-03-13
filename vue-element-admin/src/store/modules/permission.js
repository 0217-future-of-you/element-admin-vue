import { asyncRoutes, constantRoutes,asyncMyRoutes } from '@/router'
import {getRoutes} from '@/api/role'
import { map} from '@/router/index'

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}
/**
 * 自定义过滤方法
 */
export function GetRoute(arrs=[]){
  var p=[]
  arrs.forEach(s=>{
    let model={
      path: s.path,
      component: map.get(s.component),
      hidden: false,
      
      name:s.path,
      meta:s.meta
    }
    if(s.children!=null&&s.children!=undefined){
      model.children=  GetRoute(s.children)
    }
    p.push(model)

  })
  return p
}


const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }) {
    return new Promise(resolve => {

      // const roles=[]
      // 
      // if (roles.includes('admin')) {
      //   accessedRoutes = asyncMyRoutes || []
      // } else {
       
        //  accessedRoutes= filterAsyncRoutes(asyncMyRoutes,roles) 
        // accessedRoutes=asyncMyRoutes
//获取数据库路由
      // getRoutes().then(res=>{
      //   console.log('%c 🥨 res: ', 'font-size:20px;background-color: #2EAFB0;color:#fff;', res);
     
      //   
    
      //   
       getRoutes().then(res=>{
        //  let accessedRoutes
        // // console.log('%c 🍵 route: ', 'font-size:20px;background-color: #EA7E5C;color:#fff;', res.Data);
        let accessedRoutes= GetRoute(res.Data)
        // console.log('%c 🍇 accessedRoutes: ', 'font-size:20px;background-color: #465975;color:#fff;', accessedRoutes);
       
          commit('SET_ROUTES', accessedRoutes)
         resolve(accessedRoutes) 
        
       })
     // resolve(asyncMyRoutes)
      // })
   

      // console.log('%c 🥖 rout: ', 'font-size:20px;background-color: #3F7CFF;color:#fff;', rout);
      
//过滤
    //  
// console.log('%c 🥘 accessedRoutes: ', 'font-size:20px;background-color: #3F7CFF;color:#fff;', accessedRoutes);
        // accessedRoutes = filterAsyncRoutes(asyncMyRoutes, roles)
         
        // accessedRoutes = routes
        
      // }
     
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
