import { matchPath } from 'react-router-dom';

//根据请求 path 匹配路由，结果返回该路由
export default (path, routeList) => {

  let targetRoute, targetMatch;

  for (let item of routeList) {

    targetMatch = matchPath(path, item);
    if (targetMatch) {
      targetRoute = item;
      break;
    }
  }
  return { targetRoute, targetMatch };
}