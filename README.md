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
  - form 表单统一性验证

## 11.16 - 11.21

- 学习 redux

## 11.22

- 点击登录按钮 发送 ajax 请求
  - 使用 axios 发送 ajax 请求
  - 配置 axios 的拦截器
  - 解决跨域问题(配置代理 proxy,代理即服务器运行的地址, 我们发送请求的时候只需要向本地发即可,代理收到我们的请求随后把请求转发给真实的服务器地址)
  - 配置 redux, 将发请求得到的 token 和登录用户的信息交给 redux 统一管理

## 11.23

- 实现自动登录
  - redux 的缺点: 刷新页面时, redux 会被清空
  - 要实现自动登录, 可选择的就是 cookie 或者浏览器的本地存储
  - cookie 一般是后端动的
  - 在登录之后, 把用户信息和 token 以及 isLogin 存到 localStorage
  - 由于每次刷新页面时, reducer 都会被调用, 然后初始化状态
  - 因此在初始化状态那里要先去本地存储去读, 如果能读到的话,就修改初始状态为本地存储中的内容
  - 注意事项:
    - 用户登录到 admin 界面后, 就不能再让他回到 login
    - 用户没登陆.直接访问 admin 界面,要给他打回到 login 界面
- 退出登录按钮
  - 在 login 的 action 中, 在 action 里删除本地存储的数据, 并返回一个名为 delete 的 type
  - 在 login 的 reducer 里,新增匹配的 case

## 11.24

- 使用装饰器语法
- 修改打开 localhost3000 时的默认路由

## 11.25

- 发送 Ajax 请求时带着 token 过去
- 搭建 Admin 界面 (路由)

## 11.27

- 搭建 Admin 界面
  - 多个组件
- 搭建 header 界面
- 向和风天气发送请求获取天气数据

## 11.28

- 搭建 leftNav 组件

## 11.29

- 动态生成 leftNav 中的选项(根据后端返回的数据来生成)

## 11.30 
- 动态显示当前页面的名字(state + redux)
- 搭建分类管理界面

## 12.2 
- 获取分类信息
