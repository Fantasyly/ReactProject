/**
 * Login组件的reducer
 */
import { SAVE_USER_INFO } from "../action_types";

// 初始状态
let initState = {
  user: {},
  token: "",
  isLogin: false,
};
export default function loginReducer(preState = initState, action) {
  let { type, data } = action;
  let newState;
  switch (type) {
    case SAVE_USER_INFO:
      newState = {
        user: data.user.username,
        token: data.token,
        isLogin: true,
      };
      return newState;
    default:
      return preState;
  }
}
