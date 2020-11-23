/**
 * Login组件的reducer
 */
import { SAVE_USER_INFO, DELETE_USER_INFO } from "../action_types";

// 读取本地存储的内容
let user = JSON.parse(localStorage.getItem("user"));
let token = localStorage.getItem("token");
// 初始状态
let initState = {
  user: user || {},
  token: token || "",
  isLogin: user && token ? true : false,
};
export default function loginReducer(preState = initState, action) {
  let { type, data } = action;
  let newState;
  switch (type) {
    case SAVE_USER_INFO:
      newState = {
        user: data.user,
        token: data.token,
        isLogin: true,
      };
      return newState;
    case DELETE_USER_INFO:
      newState = {
        user: {},
        token: "",
        isLogin: false,
      };
      return newState;
    default:
      return preState;
  }
}
