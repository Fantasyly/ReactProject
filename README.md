# 项目编码安排及注意事项

## 11.15

- 使用脚手架创建项目
  - create-react-app reactproject
- 与 github 上的远程库进行关联
  - git remote add origin xxxx
- 下载 antd
  - npm install antd
- 配置 antd 的按需引入
  - 视频中 antd 的文档里用的是 react-app-rewired 和 customize-cra
  - 现在官网文档给的是 craco 的--但是官网没说如何进行按需引入
  - 因此我使用 react-app-rewired 和 customize-cra

## 11.16

- 配置 antd 的自定义主题
- 搭建路由
  - 首先安装 react-router-dom
  - /login 路由
  - /admin 路由
- 实现 login 界面
  - 记得先重置样式 GitHub 上一个轻量的 reset.css
  - 注意在 jsx 中引入图片 直接 import 用一个变量接着
  - 用户名采用声明式校验
  - 密码采用命令式校验
  - form表单统一性验证

## 11.16 - 11.21
- 学习redux

## 11.22
- 点击登录按钮  发送ajax请求
  - 使用axios发送ajax请求
  - 配置axios的拦截器
  - 解决跨域问题(配置代理proxy,代理即服务器运行的地址, 我们发送请求的时候只需要向本地发即可,代理收到我们的请求随后把请求转发给真实的服务器地址)
  - 配置redux, 将发请求得到的token和登录用户的信息交给redux统一管理

