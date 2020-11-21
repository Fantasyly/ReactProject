import { INCREMENT, DECREMENT } from "./actionTypes";
/**
 *
 * 根据业务需求创建不同的action
 */
export const createIncrementAction = value => ({ type: INCREMENT, data: value });
export const createDecrementAction = value => ({ type: DECREMENT, data: value });

// 一个可以执行异步操作的ActionCreator
export const createIncrementAsyncAction = (value, delay) => {
  // 这样以后就可以在这里发送ajax请求 把得到的数据封装成Action
  // 如果返回的是一个函数的话 redux底层会把dispatch传过来
  return dispatch => {
    setTimeout(() => {
      dispatch(createIncrementAction(value));
    }, delay);
  };
};
