import http from 'utils/http';

//action type
const actionType = 'action_for_home_page';

// 获取异步信息
export const getPageData = cacheData => async dispatch => {
  const res = cacheData || await http.get('index/list');
  dispatch({
    type: actionType,
    payload: {
      channelList: res.channelList,
      homeFlowList: res.homeFlowList,
      messageList: res.messageList
    }
  });
  return res; // 让node能拿到请求的数据
};

// 设置同步信息
export const setSyncState = data => dispatch => {
  dispatch({
    type: actionType,
    payload: data
  });
};

//默认数据
const defaultState = {
  homeNavType: 1,
  homeFlowListScrollTop: 0,
  channelList: [],
  homeFlowList: [],
  messageList: [],
};

export const redux = {
  stateKey: 'homePage',
  reducer: (state = defaultState, action) => {
    switch (action.type) {
      case actionType:
        return {
          ...state,
          ...action.payload
        };
      default:
        return state;
    }
  }
};