import React, { Component } from "react";
import logo from "./imgs/logo.png";
import "./css/login.less";
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

export default class MyComponent extends Component {
  onFinish = values => {
    alert('通过ajax向服务器发请求')
  };
  render() {
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
