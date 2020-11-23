/**
 *   1.项目中所有请求由该文件发出
 *   2.以后每当发请求之前，都要在该文件里添加一个方法
 */
import myAxios from "./myAxios";
import { BASE_URL } from "../config";
//  发起登录请求
export const reqLogin = (username, password) =>
  myAxios.post(`${BASE_URL}/login`, { username, password });