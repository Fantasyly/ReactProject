import React, { Component } from "react";
import { Table, Button, Card, message, Modal, Form, Input } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { reqCategory, reqAddCategory, reqUpdateCategory } from "../../api";
import { PAGESIZE } from "../../config";
import { saveCategoryAction } from "../../redux/actions/category_action";

@connect(state => ({}), {
  saveCategory: saveCategoryAction,
})
class Category extends Component {
  state = {
    categorys: [], //存储分类信息
    isVisible: false, // 是否显示弹出框
    operType: "", // 弹出框的类型: 是修改还是添加
    isLoading: true, // 是否显示表格的正在加载中
    modalCurrentId: "", // 修改时回显的数据对应的ID
  };
  formRef = React.createRef();

  componentDidMount() {
    // 组件一挂载 就去发送请求 获取分类信息
    this.getCategory();
  }

  // 从后端获取分类信息
  getCategory = async () => {
    let result = await reqCategory();
    const { data, status, msg } = result;
    if (status !== 0) {
      message.error(msg, 1);
    }

    /**
     * 同时把分类信息存到redux中
     */
    this.props.saveCategory(data);

    this.setState({ categorys: data.reverse(), isLoading: false });
  };

  /**
   * 弹出框点击确定时调用的函数
   * 1. 校验表单是否还有错误
   * 2. 若无错误,判断当前操作是添加还是修改,并调用相应的函数
   */
  handleOk = () => {
    // 获取表单实例
    let form = this.formRef.current;

    // 校验是否还有错误  返回的是一个promise
    form
      .validateFields()
      .then(values => {
        /**
         *  进入到这里 说明用户输入了正确的分类名
         *  那么就要在这里发请求 向数据库添加信息或者修改信息
         */

        const operType = this.state.operType;

        if (operType === "add") {
          // 发请求 添加分类
          const { categoryName } = values;
          this.toAdd(categoryName);
        } else if (operType === "update") {
          // 发请求 修改分类
          const { categoryName } = values;
          this.toUpdate(categoryName);
        }
      })
      .catch(reason => {
        /**
         * 进入到这里,说明有错误, 注意此时不要关闭模态框
         */
        // 如果有错误, 用户仍点击了确定 则弹出错误弹窗
        let msg = reason.errorFields[0].errors;
        message.error(msg, 1);
        return new Promise(() => {});
      });
  };

  // 弹出框点击取消时调用的函数
  handleCancel = () => {
    this.setState({
      isVisible: false,
    });
    this.formRef.current.resetFields();
  };

  // 弹出添加分类的模态框
  showAdd = () => {
    // 设置状态
    this.setState({ isVisible: true, operType: "add" });
  };

  /**
   * 弹出修改分类的模态框
   * @param {Object} item  分类信息
   *
   * 1. 弹出模态框
   * 2. 使数据回显
   */
  showUpdate = item => {
    // 获取当前点击的这一行的分类信息
    const { _id, name } = item;

    // 获取form实例
    const form = this.formRef.current;

    // 设置初始值
    form.setFieldsValue({ categoryName: name });

    // 设置状态
    this.setState({ isVisible: true, operType: "update", modalCurrentId: _id });
  };

  // 添加分类信息的函数
  toAdd = async categoryName => {
    let result = await reqAddCategory(categoryName);
    const { data, status, msg } = result;
    if (status === 0) {
      /**
       * 添加成功后  界面上并不会显示
       * 因为状态没有修改 界面不会刷新
       * 因此要把添加的数据存到状态中
       */
      let categorys = [...this.state.categorys];
      categorys.unshift(data);
      this.setState({ categorys });
      message.success("添加成功", 1);
      // 关闭模态框
      this.setState({
        isVisible: false,
      });
      // 清除表单内的数据
      this.formRef.current.resetFields();
    } else {
      /**
       * 进入这里说明要添加的分类已经存在了
       * 这时候不能关闭模态框
       */

      message.error(msg, 1);
    }
  };

  /**
   * 修改分类信息的函数
   * 1. 发请求 修改数据
   */
  toUpdate = async categoryName => {
    const { modalCurrentId } = this.state;
    const result = await reqUpdateCategory(modalCurrentId, categoryName);
    const { status } = result;

    if (status === 0) {
      // 弹窗
      message.success("修改成功!", 1);

      //拉取新的分类列表
      this.getCategory();
      // 关闭模态框
      this.setState({
        isVisible: false,
      });
    }
  };

  render() {
    const dataSource = this.state.categorys;
    const { isVisible, operType } = this.state;

    const columns = [
      {
        title: "分类名称",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "操作",
        key: "operation",
        width: "25%",
        align: "center",
        render: item => (
          <Button
            type="link"
            onClick={() => {
              this.showUpdate(item);
            }}
          >
            修改分类
          </Button>
        ),
      },
    ];

    return (
      <div>
        <Card
          extra={
            <Button type="primary" onClick={this.showAdd}>
              <PlusCircleOutlined />
              添加
            </Button>
          }
        >
          <Table
            dataSource={dataSource}
            columns={columns}
            bordered={true}
            rowKey="_id"
            pagination={{ pageSize: PAGESIZE, showQuickJumper: true }}
            loading={this.state.isLoading}
          />
        </Card>
        <Modal
          title={operType === "add" ? "添加分类" : "修改分类"}
          visible={isVisible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          okText="确定"
          cancelText="取消"
          forceRender // 设置强制预渲染
        >
          <Form
            name="normal_login"
            className="addInfo-form"
            // 获取form表单实例
            ref={this.formRef}
            initialValues={{
              categoryName: "",
            }}
          >
            <Form.Item
              name="categoryName"
              rules={[
                // 分类名校验
                {
                  required: true,
                  message: "分类名必须输入",
                },
              ]}
            >
              <Input placeholder="分类名称" />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}
export default Category;
