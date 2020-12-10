import React, { Component } from "react";
import { Card, List, message } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { reqProdcutById, reqCategory } from "../../api";
import "./detail.less";

@connect(
  state => ({
    categoryInfo: state.categoryInfo,
    productInfo: state.productInfo,
  }),
  {}
)
class Detail extends Component {
  state = {
    imgs: [],
    name: "",
    desc: "",
    price: 0,
    categoryId: "",
    detail: "",
    isLoading: true,
  };

  componentDidMount() {
    // 获取id
    const { id } = this.props.match.params;

    // 从redux中拿商品信息
    const { productInfo } = this.props;
    // 如果redux中不存在  也就是刷新页面了 此时去向服务器请求
    if (productInfo.length <= 0) {
      // 如果不存在该数据 则去服务器请求
      this.reqProd(id);
    } else {
      // 从redux中获取当前商品
      const { imgs, name, desc, price, categoryId, detail } = productInfo.find(item => {
        return item._id === id;
      });

      // 因为setState是异步操作,因此提前把需要的ID存起来
      this.categoryId = categoryId;
      this.setState({ imgs, name, desc, price, categoryId, detail, isLoading: false });
    }

    // 从redux中拿分类信息
    const { categoryInfo } = this.props;

    // 如果redux中不存在, 则发送请求去后台拿
    if (categoryInfo.length <= 0) {
      this.reqCate();
    } else {
      // 从redux中获取当前分类名称
      const result = categoryInfo.find(item => {
        return item._id === this.categoryId;
      });
      this.setState({ categoryName: result.name, isLoading: false });
    }
  }

  reqProd = async id => {
    const result = await reqProdcutById(id);
    const { status, data } = result;
    if (status === 0) {
      const { imgs, name, desc, price, categoryId, detail } = data;
      this.categoryId = data.categoryId;
      this.setState({ imgs, name, desc, price, categoryId, detail, isLoading: false });
    } else {
      message.error("获取商品信息失败", 1);
    }
  };

  reqCate = async () => {
    const { status, data } = await reqCategory();
    if (status === 0) {
      const result = data.find(item => {
        return item._id === this.categoryId;
      });
      this.setState({ categoryName: result.name, isLoading: false });
    }
  };
  render() {
    return (
      <>
        <Card
          title={
            <div className="title">
              <ArrowLeftOutlined
                onClick={() => {
                  this.props.history.goBack();
                }}
              />
              <span>商品详情</span>
            </div>
          }
          loading={this.state.isLoading}
        >
          <List size="large">
            <List.Item className="list-item">
              <span className="product-title">商品名称:</span>
              {this.state.name}
            </List.Item>
            <List.Item className="list-item">
              <span className="product-title">商品描述:</span>
              {this.state.desc}
            </List.Item>
            <List.Item className="list-item">
              <span className="product-title">商品价格:</span>
              {this.state.price}
            </List.Item>
            <List.Item className="list-item">
              <span className="product-title">商品分类:</span>
              {this.state.categoryName}
            </List.Item>
            <List.Item className="list-item">
              <span className="product-title">商品图片:</span>
              {this.state.imgs.map((item, index) => {
                return (
                  <img
                    style={{ wdith: "200px", height: "200px" , margin:'0 10px'}}
                    key={index}
                    src={`/upload/${item}`}
                    alt="商品详情"
                  />
                );
              })}
            </List.Item>
            <List.Item className="list-item">
              <span className="product-title">商品详情:</span>
              <span dangerouslySetInnerHTML={{ __html: this.state.detail }}></span>
            </List.Item>
          </List>
        </Card>
      </>
    );
  }
}
export default Detail;
