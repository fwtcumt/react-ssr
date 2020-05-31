// 将路由转换为静态路由

async function getStaticRoutes(routes) {
  
  const key ='_static_routes_cache_';

  if (global[key]){
    // 如有缓存，读缓存
    return global[key];
  }

  let len = routes.length;
  const staticRoutes = [];

  for (let i = 0; i < len; i++) {
    let item = routes[i];
    
    if (item.component.isAsync) {
      
      staticRoutes.push({
        ...item,
        component: (await item.component.loader()).default
      });
    } else {
      staticRoutes.push({ ...item });
    }
  }

  global[key] = staticRoutes;

  return staticRoutes;
}

export default getStaticRoutes;
