export function GetRoute(arrs=[]){
    var p=[]
    arrs.forEach(s=>{
      let model={
        path: s.path,
        component: map.get(s.component),
        hidden: true,
        name:s.path,
        meta:s.meta
      }
      if(s.children!=null&&s.children!=undefined){
        model.children=  GetParent(s.children)
      }
      p.push(model)
  
    })
    return p
  }