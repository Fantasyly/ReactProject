import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Input, Button, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Redirect } from "react-router-dom";
import logo from "../../static/logo.png";
import { createSaveUserInfoAction } from "../../redux/actions/login_action";
import { reqLogin } from "../../api"; // 引入index.js时写到文件夹就可以了
import "./css/login.less";

@connect(state => ({ isLogin: state.userInfo.isLogin }), {
  saveUserInfo: createSaveUserInfoAction,
})
class Login extends Component {
  onFinish = async values => {
    let { username, password } = values;
    // await等待发送ajax请求的成功的结果  错误的结果已经在拦截器中进行拦截了
    let result = await reqLogin(username, password);

    let { status, msg, data } = result;
    if (status === 0) {
      // 保存数据到redux中
      this.props.saveUserInfo(data);

      // 登录成功 跳转到admin界面
      this.props.history.replace("/admin");
    } else {
      // 若登录失败
      message.warning(msg, 1);
    }
  };
  render() {
    if (this.props.isLogin) {
      return <Redirect to="/admin" />;
    }
    return (
      <div className="login">
        <header>
          {/* 注意图片的引入方法 */}
          <img src={logo} alt="logo" />
          <h1>商品管理网站</h1>
        </header>
        <section>
          <h1>用户登录</h1>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
            }}
            onFinish={this.onFinish}
          >
            <Form.Item
              name="username"
              rules={[
                // 用户名校验
                {
                  required: true,
                  message: "用户名必须输入",
                },
                {
                  max: 12,
                  message: "用户名必须小于等于12位",
                },
                {
                  min: 4,
                  message: "用户名必须大于4位",
                },
                {
                  pattern: /^\w+$/,
                  message: "用户名必须是字母,数字和下划线组成",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="用户名"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  // 自定义密码的校验
                  validator: (rule, value) => {
                    if (!value) {
                      return Promise.reject("密码不能为空");
                    } else if (value.length > 12) {
                      return Promise.reject("密码必须小于等于12位");
                    } else if (value.length < 4) {
                      return Promise.reject("密码必须大于等于4位");
                    } else if (!/^\w+$/.test(value)) {
                      return Promise.reject("密码必须是字母、数字、下划线组成");
                    } else {
                      return Promise.resolve();
                    }
                  },
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="密码"
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button" block>
                登录
              </Button>
            </Form.Item>
          </Form>
        </section>
      </div>
    );
  }
}

/**
 * 把容器组件和UI组件糅杂在一块
 * connect将状态和生成action的方法发到props中
 */

export default Login;
