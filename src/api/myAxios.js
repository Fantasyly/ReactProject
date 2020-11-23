/**
 * 配置axios的拦截器
 */
import axios from "axios";
import qs from "querystring";
import { message } from "antd";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

const instance = axios.create({
  timeout: 8000, // 配置超时时间 超过8s没响应 认为是连接失败
});

// 设置请求拦截器 请求拦截器就是发送请求之前先进行一些配置

instance.interceptors.request.use(config => {
  // 进度条开始
  NProgress.start();
  // 从配置对象中获取method和data
  const { method, data } = config;

  // 我们假设后端要求post发的请求必须是urlencoded格式的,不准是json格式的
  // 因此我们需要使用querystring将对象转化成urlencoded格式
  if (method.toLowerCase() === "post") {
    // 判断一下data是不是对象 如果不是对象,说明已经是urlencoded格式的  就不需要再转了
    if (data instanceof Object) {
      config.data = qs.stringify(data);
    }
  }
  return config;
});

// 设置响应拦截器 就是当响应回来后 先通过这里
instance.interceptors.response.use(
  // 响应成功走这里
  response => {
    // 进度条结束
    NProgress.done();
    //   请求如果成功 则返回真正的数据
    return response.data;
  },

  // 响应失败走这里
  error => {
    // 进度条结束
    NProgress.done();
    message.error(error.message);
    return new Promise(() => {});
  }
);

export default instance;
