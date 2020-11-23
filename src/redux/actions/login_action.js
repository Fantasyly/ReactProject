/**
 * 为login封装action
 */
import { SAVE_USER_INFO,DELETE_USER_INFO } from "../action_types";

// 保存登录用户信息
export const createSaveUserInfoAction = value => {
  // 把数据存到本地存储中
  localStorage.setItem("user", JSON.stringify(value.user));
  localStorage.setItem("token", value.token);
  return {
    type: SAVE_USER_INFO,
    data: value,
  };
};

// 删除登录用户信息 实现退出登录
export const createDeleteUserInfoAction = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  return {
    type: DELETE_USER_INFO
  }
};
