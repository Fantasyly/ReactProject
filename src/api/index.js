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

// 添加分类信息
export const reqAddCategory = categoryName => {
  return myAxios.post(`${BASE_URL}//manage/category/add`, { categoryName });
};

// 修改分类信息
export const reqUpdateCategory = (categoryId, categoryName) => {
  return myAxios.post(`${BASE_URL}//manage/category/update`, { categoryId, categoryName });
};

// 获取每页的商品信息
export const reqProductsByPage = (pageNum, pageSize) => {
  return myAxios.get(`${BASE_URL}/manage/product/list`, { params: { pageNum, pageSize } });
};

//  请求对商品进行上架/下架处理
export const reqUpdateProdStatus = (productId, status) => {
  return myAxios.post(`${BASE_URL}//manage/product/updateStatus`, { productId, status });
};

// 搜索
export const reqSearch = (pageNum, pageSize, searchType, searchKeywords) => {
  return myAxios.get(`${BASE_URL}/manage/product/search`, {
    params: { pageNum, pageSize, [searchType]: searchKeywords },
  });
};

// 根据商品ID获取分类列表
export const reqProdcutById = productId => {
  return myAxios.get(`${BASE_URL}/manage/product/info`, {
    params: { productId },
  });
};

// 根据图片名称在服务器上删除图片
export const reqDeleteImg = name => {
  return myAxios.post(`${BASE_URL}/manage/img/delete`, { name });
};

// 添加商品
export const reqAddProduct = productObj => {
  return myAxios.post(`${BASE_URL}/manage/product/add`, productObj);
};

// 获取角色列表
export const reqRoleList = () => {
  return myAxios.get(`${BASE_URL}/manage/role/list`);
};

// 添加角色
export const reqAddRole = roleName => {
  return myAxios.post(`${BASE_URL}/manage/role/add`, { roleName });
};

// 设置角色权限
export const reqSetPermisson = permissonObj => {
  return myAxios.post(`${BASE_URL}/manage/role/update`, { ...permissonObj, auth_time: Date.now() });
};

// 获取用户列表
export const reqUserList = () => {
  return myAxios.get(`${BASE_URL}/manage/user/list`);
};

// 添加用户

export const reqAddUser = userObj => {
  return myAxios.post(`${BASE_URL}/manage/user/add`, { ...userObj });
};
