import React, { Component } from "react";
import { Card, Button, Table, message, Modal, Form, Input, Tree } from "antd";
import dayjs from "dayjs";
import { connect } from "react-redux";
import { reqRoleList, reqAddRole, reqSetPermisson } from "../../api";
import menuData from "../../config/menu_config";

@connect(state => ({ username: state.userInfo.user.username }))
class Role extends Component {
  state = {
    dataSource: [], // 角色源数据
    isAddRole: false, // 弹出添加用户框
    setPermissons: false, // 弹出设置权限的模态框
    checkedKeys: ["home"], // 选中的
    currentRole: {}, // 当前操作的角色
  };
  formRef = React.createRef();
  componentDidMount() {
    this.getRoleList();
  }

  // 获取角色列表
  getRoleList = async () => {
    let { status, data } = await reqRoleList();
    if (status === 0) {
      this.setState({ dataSource: data });
    } else {
      message.error("获取角色列表失败", 1);
    }
  };

  // 添加角色时点击确定时的回调
  addRoleOk = () => {
    const form = this.formRef.current;
    form
      .validateFields()
      .then(async values => {
        //{name: "adad"}
        /**
         * 无错误的话  关闭模态框
         * 并发送请求
         */
        let { status, msg, data } = await reqAddRole(values.name);
        if (status === 0) {
          let dataSource = [...this.state.dataSource];
          dataSource.push(data);
          // 修改状态中的列表
          this.setState({ isAddRole: false, dataSource });
          // 清除表单内的数据
          form.resetFields();
        } else {
          message.error(msg, 1);
        }
      })
      .catch(reason => {
        message.error("请确保每一项输入正确", 1);
      });
  };

  // 添加角色时点击取消时的回调
  addRoleCancel = () => {
    this.setState({ isAddRole: false });
  };

  // 选中某个选项 勾选时 就会把勾选的选项维护到状态中
  onCheck = checkedKeys => {
    this.setState({ checkedKeys });
  };

  // 点击 设置权限时弹出模态框
  showPermisson = currentRole => {
    // 从状态中查找当前角色的权限  用于数据回显
    const { dataSource } = this.state;
    let { menus } = dataSource.find(item => {
      return item._id === currentRole._id;
    });
    // 显示模态框, 并把当前操作的角色信息放到状态中
    this.setState({ setPermissons: true, currentRole, checkedKeys: menus });
  };
  // 设置权限时点击确定时的回调
  setPmisonOK = async () => {
    const { checkedKeys, currentRole } = this.state;
    const { username } = this.props;

    let { status, msg, data } = await reqSetPermisson({
      menus: checkedKeys,
      _id: currentRole._id,
      auth_name: username,
    });

    if (status === 0) {
      message.success("设置权限成功", 1);
      this.getRoleList();
      this.setState({ setPermissons: false });
    } else {
      message.error(msg, 1);
    }
  };

  // 设置权限时点击取消时的回调
  setPmisonCancel = () => {
    this.setState({ setPermissons: false });
  };

  render() {
    const { dataSource, isAddRole, setPermissons, currentRole } = this.state;

    const columns = [
      {
        title: "角色名称",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "创建时间",
        dataIndex: "create_time",
        key: "create_time",
        render: time => {
          return dayjs(time).format("YYYY年MM月DD日 HH:mm:ss");
        },
      },
      {
        title: "授权时间",
        dataIndex: "auth_time",
        key: "auth_time",
        render: time => {
          return time && dayjs(time).format("YYYY年MM月DD日 HH:mm:ss");
        },
      },
      {
        title: "授权人",
        dataIndex: "auth_name",
        key: "auth_name",
      },
      {
        title: "权限",
        // dataIndex: "menus",
        key: "menus",
        render: item => {
          return (
            <Button
              type="link"
              onClick={() => {
                this.showPermisson(item);
              }}
            >
              设置权限
            </Button>
          );
        },
      },
    ];

    const treeData = [
      {
        title: "后台权限",
        key: "all",
        children: menuData,
      },
    ];

    return (
      <>
        <Card
          title={
            <Button
              type="primary"
              onClick={() => {
                this.setState({ isAddRole: true });
              }}
            >
              添加角色
            </Button>
          }
        >
          <Table dataSource={dataSource} columns={columns} bordered rowKey="_id" />
        </Card>
        <Modal
          title="添加角色"
          visible={isAddRole}
          onOk={this.addRoleOk}
          onCancel={this.addRoleCancel}
          okText="确定"
          cancelText="取消"
          // forceRender // 设置强制预渲染
        >
          <Form
            name="addRole"
            className="addInfo-form"
            // 获取form表单实例
            ref={this.formRef}
            // initialValues={{
            //   categoryName: "",
            // }}
          >
            <Form.Item
              name="name"
              rules={[
                // 角色名校验
                {
                  required: true,
                  message: "角色名必须输入",
                },
              ]}
            >
              <Input placeholder="请输入角色名称" />
            </Form.Item>
          </Form>
        </Modal>

        <Modal
          title="设置权限"
          visible={setPermissons}
          onOk={this.setPmisonOK}
          onCancel={this.setPmisonCancel}
          okText="确定"
          cancelText="取消"
          // forceRender // 设置强制预渲染
        >
          <div>当前操作的角色为:{currentRole.name}</div>
          <Tree
            checkable
            onCheck={this.onCheck}
            checkedKeys={this.state.checkedKeys}
            treeData={treeData}
            defaultExpandAll // 默认展开所有
            selectable={false} // 设置不可选中
          />
        </Modal>
      </>
    );
  }
}
export default Role;
