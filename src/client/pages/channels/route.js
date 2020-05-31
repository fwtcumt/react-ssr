import AsyncLoader from '../../router/async-loader';

export default {
  path: '/channels',
  component: AsyncLoader(() => import(/*webpackChunkName:"chunk-channels"*/'./index')),
  exact: true
};