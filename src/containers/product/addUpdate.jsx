import React, { Component } from "react";
import { Card, Form, Input, Button, Select, message } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import PicturesWall from "./picturesWall";
import { reqCategory, reqAddProduct } from "../../api";
import RichText from "./richText";

const { Option } = Select;
@connect(state => ({ categoryInfo: state.categoryInfo, productInfo: state.productInfo }))
class AddUpdate extends Component {
  state = {
    categoryInfo: [], // 分类信息
    operType: "add", // 默认是添加状态
  };
  picWall = React.createRef();
  richText = React.createRef();
  form = React.createRef();

  componentDidMount() {
    // 获取分类列表
    const { categoryInfo, productInfo } = this.props;

    if (categoryInfo.length) {
      // 如果redux中有分类信息 则存到状态中
      this.setState({ categoryInfo });
    } else {
      // 向服务器发请求获取分类信息 然后存到状态中
      this.getCategoryInfo();
    }

    // 查看带过来的id  如果没带过来 则说明是添加 如果有id 说明是修改商品
    const { id } = this.props.match.params;
    if (id) {
      let product;
      // 判断redux中是否有productInfo
      if (productInfo.length) {
        product = productInfo.find(item => {
          return item._id === id;
        });
      } else {
      }
      this.form.current.setFieldsValue({ ...product });
      this.setState({ operType: "update" });
      // 把从服务器捞过来的图片交给照片墙
      this.picWall.current.setFileList(product.imgs);

      // 把从服务器捞过来的文本显示在编辑器内
      this.richText.current.setText(product.detail);
    }
  }

  // 获取分类信息的回调
  getCategoryInfo = async () => {
    const result = await reqCategory();
    this.setState({ categoryInfo: result.data });
  };

  // 添加商品信息
  onFinish = async values => {
    console.log(values);
    // 获取图片
    let imgs = this.picWall.current.getImgNamesArr();

    // 获取输入的文本
    let detail = this.richText.current.getText();
    let result = await reqAddProduct({ ...values, detail, imgs });
    if (result.status === 0) {
      message.success("添加商品成功");
      this.pros.history.replace("/admin/prod_about/product");
    }
    console.log(result);
    message.error("添加商品失败", 1);
  };
  render() {
    const { categoryInfo, operType, product } = this.state;
    return (
      <Card
        title={
          <div className="title">
            <ArrowLeftOutlined
              onClick={() => {
                this.props.history.goBack();
              }}
            />
            <span>{operType === "add" ? "添加商品" : "修改商品"}</span>
          </div>
        }
      >
        <Form
          // {...layout}
          name="basic"
          initialValues={{
            remember: true,
            name: "",
            desc: "",
            price: "",
            categoryId: "",
          }}
          // 左边文字占的栅格数
          labelCol={{
            md: 2,
          }}
          // 右边占的栅格数
          wrapperCol={{
            md: 8,
          }}
          onFinish={this.onFinish}
          ref={this.form}
        >
          <Form.Item
            label="商品名称"
            name="name"
            rules={[
              {
                required: true,
                message: "商品名称不得为空",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="商品描述"
            name="desc"
            rules={[
              {
                required: true,
                message: "商品描述不得为空",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="商品价格"
            name="price"
            rules={[
              {
                required: true,
                message: "商品价格不得为空",
              },
            ]}
          >
            <Input type="number" addonBefore="￥" addonAfter="元" />
          </Form.Item>

          <Form.Item
            label="商品分类"
            name="categoryId"
            rules={[
              {
                required: true,
                message: "请选择商品分类",
              },
            ]}
          >
            <Select>
              <Option value="">-----请选择商品分类------</Option>
              {categoryInfo.map(item => {
                return (
                  <Option key={item._id} value={item._id}>
                    {item.name}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>

          <Form.Item label="商品图片">
            <PicturesWall ref={this.picWall} />
          </Form.Item>

          <Form.Item
            label="商品详情"
            wrapperCol={{
              md: 12,
            }}
          >
            <RichText ref={this.richText} />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 1,
            }}
          >
            <Button type="primary" htmlType="submit">
              添加
            </Button>
          </Form.Item>
        </Form>
      </Card>
    );
  }
}
export default AddUpdate;
