import React, { Component } from "react";
import { Card, Button, Table, message, Modal, Input, Form, Select } from "antd";
import dayjs from "dayjs";
import { reqUserList } from "../../api";
import { PAGESIZE } from "../../config";
import { reqAddUser } from "../../api";

const { Option } = Select;
class User extends Component {
  state = {
    userList: [], //用户列表
    roleList: [], //角色列表
    isAddUser: false, // 控制添加用户模态框的弹出
  };
  formRef = React.createRef();
  componentDidMount() {
    this.getUserList();
  }

  // 获取用户列表
  getUserList = async () => {
    let { data, status, msg } = await reqUserList();
    if (status === 0) {
      this.setState({ userList: data.users.reverse(), roleList: data.roles });
    } else {
      message.error(msg, 1);
    }
  };

  // 弹出添加用户的模态框
  showModal = () => {
    this.setState({ isAddUser: true });
  };
  // 添加用户点击确定时
  addUserOk = () => {
    const form = this.formRef.current;
    form
      .validateFields()
      .then(async values => {
        const { data, status, msg } = await reqAddUser(values);
        if (status === 0) {
          message.success("添加用户成功", 1);
          const userList = [...this.state.userList];
          userList.unshift(data);
          this.setState({ userList, isAddUser: false });
          form.resetFields();
        } else {
          message.error(msg, 1);
        }
      })
      .catch(reason => {
        message.warning("请确保每一项输入正确", 1);
      });
  };

  // 添加用户  点击取消时
  addUserCancel = () => {
    this.setState({ isAddUser: false });
  };

  render() {
    const { userList, isAddUser, roleList } = this.state;
    const columns = [
      {
        title: "用户名",
        dataIndex: "username",
        key: "username",
      },
      {
        title: "手机号",
        dataIndex: "phone",
        key: "phone",
      },
      {
        title: "邮箱",
        dataIndex: "email",
        key: "email",
      },
      {
        title: "角色",
        dataIndex: "role_id",
        key: "role_id",
        render: id => {
          const { roleList } = this.state;
          return roleList.find(item => {
            return item._id === id;
          }).name;
        },
      },
      {
        title: "创建时间",
        dataIndex: "create_time",
        key: "menucreate_times",
        render: time => {
          return time && dayjs(time).format("YYYY年MM月DD日 HH:mm:ss");
        },
      },
    ];
    return (
      <>
        <Card
          title={
            <Button type="primary" onClick={this.showModal}>
              添加用户
            </Button>
          }
        >
          <Table
            dataSource={userList}
            columns={columns}
            bordered
            rowKey="_id"
            pagination={{ pageSize: PAGESIZE }}
          />
        </Card>
        <Modal
          title="添加用户"
          visible={isAddUser}
          onOk={this.addUserOk}
          onCancel={this.addUserCancel}
          okText="确定"
          cancelText="取消"
          // forceRender // 设置强制预渲染
        >
          <Form
            name="addUser"
            className="addInfo-form"
            // 获取form表单实例
            ref={this.formRef}
            labelCol={{
              md: 4,
            }}
            wrapperCol={{
              md: 16,
            }}
            initialValues={{
              role_id: "",
            }}
          >
            <Form.Item
              label="用户名"
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
              <Input placeholder="请输入用户名" />
            </Form.Item>
            <Form.Item
              label="密码"
              name="password"
              rules={[
                // 密码校验
                {
                  required: true,
                  message: "请输入密码",
                },
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
              <Input tyoe="password" placeholder="请输入密码" />
            </Form.Item>
            <Form.Item
              label="手机号"
              name="phone"
              rules={[
                // 手机号校验
                {
                  required: true,
                  message: "请输入手机号",
                },
                {
                  validator: (rule, value) => {
                    if (
                      !/^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/.test(
                        value
                      )
                    ) {
                      return Promise.reject("请输入合法的手机号");
                    } else {
                      return Promise.resolve();
                    }
                  },
                },
              ]}
            >
              <Input placeholder="请输入手机号" />
            </Form.Item>

            <Form.Item
              label="邮箱"
              name="email"
              rules={[
                // 邮箱校验
                {
                  required: true,
                  message: "请输入邮箱",
                },
                {
                  validator: (rule, value) => {
                    if (!/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(value)) {
                      return Promise.reject("请输入合法的邮箱");
                    } else {
                      return Promise.resolve();
                    }
                  },
                },
              ]}
            >
              <Input placeholder="请输入邮箱" />
            </Form.Item>
            <Form.Item
              label="角色"
              name="role_id"
              rules={[
                // 角色校验
                {
                  required: true,
                  message: "请选择角色",
                },
              ]}
            >
              <Select>
                <Option value="">请选择分类</Option>
                {roleList.map(item => {
                  return (
                    <Option key={item._id} value={item._id}>
                      {item.name}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Form>
        </Modal>
      </>
    );
  }
}
export default User;
