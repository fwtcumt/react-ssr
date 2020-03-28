import Index from '../pages/index';
import List from '../pages/list';

export default [
  {
    path: '/index',
    component: Index,
    exact: true
  },
  {
    path: '/list',
    component: List,
    exact: true
  }
];
