import AsyncLoader from '../../router/async-loader';

export default {
  path: ['/', '/home'],
  component: AsyncLoader(() => import(/*webpackChunkName:"chunk-home"*/'./index')),
  exact: true
};