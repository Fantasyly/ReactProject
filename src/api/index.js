/**
 *   1.项目中所有请求由该文件发出
 *   2.以后每当发请求之前，都要在该文件里添加一个方法
 */
import myAxios from "./myAxios";
import { BASE_URL, WEATHER_URL } from "../config";
//  发起登录请求
export const reqLogin = (username, password) => {
  return myAxios.post(`${BASE_URL}/login`, { username, password });
};

// 获取分类列表
export const reqCategory = () => {
  return myAxios.get(`${BASE_URL}/manage/category/list`);
};

// 向和风天气发送请求获取数据
export const reqWeather = () => {
  return myAxios.get(WEATHER_URL);
};
