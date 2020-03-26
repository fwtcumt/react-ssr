import React from 'react';
import ReactDom from 'react-dom';
import Index from '../pages/index';

//渲染 Index 组建到页面
ReactDom.hydrate(
  <Index />,
  document.getElementById('root')
);
