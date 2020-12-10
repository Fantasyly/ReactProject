import React, { Component } from "react";
import { Card, Button, Select, Input, Table, message } from "antd";
import { PlusCircleOutlined, SearchOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { reqProductsByPage, reqUpdateProdStatus, reqSearch } from "../../api";
import { PAGESIZE } from "../../config";
import { saveProdsAction } from "../../redux/actions/product_action";
const { Option } = Select;

@connect(state => ({ a: state.categorys }), {
  saveProducts: saveProdsAction,
})
class Product extends Component {
  state = {
    productList: [], // 每页的商品数据
    total: 0, // 总的商品个数  用来确定分页的页数
    current: 1, //当前默认页数
    searchKeywords: "", //搜索的关键词
    searchType: "productName", // 搜索类型
    isLoading: true, // 是否显示loading
  };

  componentDidMount() {
    // 初始化商品信息
    this.getProductByPage();
    // console.log(this.props.a);
  }

  // 通过页数获取商品信息以及搜索
  getProductByPage = async (page = 1) => {
    let result;
    if (this.isSearch) {
      // 当前是搜索
      const { searchType, searchKeywords } = this.state;
      result = await reqSearch(page, PAGESIZE, searchType, searchKeywords);
    } else {
      result = await reqProductsByPage(page, PAGESIZE);
    }

    let { status, data } = result;
    if (status === 0) {
      this.setState({ productList: data.list, total: data.total, current: page, isLoading: false });

      /**
       * 这里还要做一步 把商品信息存到redux中, 从而点击详情页时可以获得数据
       * 减少向服务器发送请求的次数
       */

      this.props.saveProducts(data.list);
    } else {
      message.error("获取商品信息列表失败", 1);
    }
  };

  // 更新商品上架或下架状态
  updateProdStatus = async ({ _id, status }) => {
    let result = await reqUpdateProdStatus(_id, status);
    if (result.status === 0) {
      // 如果更新成功的话  去修改状态中存储的status
      let productList = [...this.state.productList];
      productList.map(item => {
        if (item._id === _id) {
          item.status = item.status === 1 ? 2 : 1;
        }
        return item;
      });
      this.setState({ productList });
    } else {
      message.error("修改商品状态失败", 1);
    }
  };

  // 搜索
  search = () => {
    this.isSearch = true;
    this.getProductByPage();
  };

  render() {
    const dataSource = this.state.productList;

    const columns = [
      {
        title: "名称",
        dataIndex: "name",
        key: "name",
        width: "15%",
      },
      {
        title: "描述",
        dataIndex: "desc",
        key: "desc",
      },
      {
        title: "价格",
        dataIndex: "price",
        key: "price",
        width: "10%",
        align: "center",
        render: price => {
          return `￥${price}`;
        },
      },
      {
        title: "状态",
        // dataIndex: "status",
        key: "status",
        width: "10%",
        align: "center",
        render: item => {
          let { status } = item;
          return (
            <>
              <Button
                type={status === 1 ? "danger" : "primary"}
                onClick={() => {
                  this.updateProdStatus(item);
                }}
              >
                {status === 1 ? "下架" : "上架"}
              </Button>
              <br />
              <p>{status === 1 ? "在售中" : "已停售"}</p>
            </>
          );
        },
      },
      {
        title: "操作",
        // dataIndex: "detail",
        key: "detail",
        width: "10%",
        align: "center",
        render: item => {
          return (
            <>
              <Button
                type="link"
                onClick={() => {
                  this.props.history.push(`/admin/prod_about/product/detail/${item._id}`);
                }}
              >
                详情
              </Button>
              <br />
              <Button
                type="link"
                onClick={() => {
                  this.props.history.push(`/admin/prod_about/product/addupdate/${item._id}`);
                }}
              >
                修改
              </Button>
            </>
          );
        },
      },
    ];

    return (
      <Card
        title={
          <>
            <Select
              defaultValue="productName"
              onChange={value => {
                this.setState({ searchType: value });
              }}
            >
              <Option value="productName">按名称查询</Option>
              <Option value="productDesc">按描述查询</Option>
            </Select>
            <Input
              placeholder="请输入关键字"
              style={{ width: "20%", margin: "0px 1%" }}
              allowClear
              // 把Input做成受控组件 方便一会搜索
              onChange={event => {
                this.setState({ searchKeywords: event.target.value });
              }}
            />
            <Button
              type="primary"
              onClick={() => {
                this.search();
              }}
            >
              <SearchOutlined />
              搜索
            </Button>
          </>
        }
        extra={
          <Button
            type="primary"
            onClick={() => {
              this.props.history.push("/admin/prod_about/product/addupdate");
            }}
          >
            <PlusCircleOutlined />
            添加商品
          </Button>
        }
      >
        <Table
          dataSource={dataSource}
          columns={columns}
          bordered
          rowKey="_id"
          // 设置分页  要设置总的个数
          pagination={{
            pageSize: PAGESIZE,
            showQuickJumper: true,
            total: this.state.total,
            onChange: this.getProductByPage,
            current: this.state.current,
          }}
          loading={this.state.isLoading}
        />
      </Card>
    );
  }
}

export default Product;
