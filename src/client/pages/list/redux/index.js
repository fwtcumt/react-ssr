import tempData from '../data';

//action type
export const ACTION_TYPE = {
  changeList:'list/changelist'
}

//异步获得数据 【副作用】
export const getInitialData = (props) => {
  return (dispatch, getState) => {
    return new Promise(resolve=>{
      setTimeout(() => {
        const data = {
          fetchData: {
            code: 0,
            data: tempData
          }
        };
        resolve(data);
        dispatch({
          type: ACTION_TYPE.changeList,
          payload: data
        });
      }, 300);
    })
  };
};

//默认数据
const defaultState = {
  fetchData: {},
};

export const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case ACTION_TYPE.changeList:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
}