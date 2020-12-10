import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import { Layout } from "antd";
import { createDeleteUserInfoAction } from "../../redux/actions/login_action";
import Header from "./header/header";
import "./css/admin.less";
import Home from "../../components/home/home";
import Category from "../category/category";
import Product from "../product/product";
import Detail from "../product/detail";
import AddUpdate from "../product/addUpdate";
import User from "../user/user";
import Role from "../role/role";
import Bar from "../bar/bar";
import Line from "../line/line";
import Pie from "../pie/pie";
import LeftNav from "./leftNav/leftnav";

const { Footer, Sider, Content } = Layout;

@connect(state => ({ userInfo: state.userInfo }), {
  deleteUserInfo: createDeleteUserInfoAction,
})
class Admin extends Component {
  logout = () => {
    this.props.deleteUserInfo();
  };

  render() {
    const { isLogin } = this.props.userInfo;
    if (!isLogin) {
      // 如果没登录的话 直接跳转到登陆界面
      return <Redirect to="/login" />;
    } else {
      return (
        <Layout className="admin">
          <Sider>
            <LeftNav />
          </Sider>
          <Layout>
            <Header>Header</Header>
            <Content className="content">
              {/* 使用路由 */}
              <Switch>
                <Route path="/admin/home" component={Home} />
                <Route path="/admin/prod_about/category" component={Category} />
                <Route path="/admin/prod_about/product" component={Product} exact />
                <Route path="/admin/prod_about/product/detail/:id" component={Detail} />
                <Route path="/admin/prod_about/product/addupdate/:id" component={AddUpdate} />
                <Route path="/admin/prod_about/product/addupdate" component={AddUpdate} />
                <Route path="/admin/user" component={User} />
                <Route path="/admin/role" component={Role} />
                <Route path="/admin/charts/bar" component={Bar} />
                <Route path="/admin/charts/line" component={Line} />
                <Route path="/admin/charts/pie" component={Pie} />
                <Redirect to="/admin/home" />
              </Switch>
            </Content>
            <Footer>推荐使用Chrome浏览器以获得最佳页面操作体验</Footer>
          </Layout>
        </Layout>
      );
    }
  }
}
export default Admin;
