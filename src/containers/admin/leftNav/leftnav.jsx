import React, { Component } from "react";
import { Menu } from "antd";
import * as Icon from "@ant-design/icons";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import logo from "../../../static/logo.png";
import menuList from "../../../config/menu_config";
import "./leftNav.less";
import { createSaveTitleAction } from "../../../redux/actions/title_action";

const { SubMenu, Item } = Menu;
@connect(
  state => ({ roles: state.userInfo.user.role.menus, username: state.userInfo.user.username }),
  { saveTitle: createSaveTitleAction }
)
@withRouter
class LeftNav extends Component {
  menuDisplay = menus => {
    return menus.map(item => {
      if (this.hasPermisson(item)) {
        let iconType = item.icon;
        if (!item.children) {
          return (
            <Item
              key={item.key}
              onClick={() => {
                // 点击时 把当前的title存到redux中
                // console.log(item.title);
                this.props.saveTitle(item.title);
              }}
              icon={React.createElement(Icon[iconType])}
            >
              <Link to={item.path}>{item.title}</Link>
            </Item>
          );
        } else {
          return (
            <SubMenu key={item.key} icon={React.createElement(Icon[iconType])} title={item.title}>
              {this.menuDisplay(item.children)}
            </SubMenu>
          );
        }
      }
      return <></>;
    });
  };

  // 判断该用户是否有这个权限
  hasPermisson = permission => {
    // 判断proles中是否包含permission
    const { roles, username } = this.props;
    if (username === "admin") {
      return true;
    } else if (!permission.children) {
      return roles.find(item => {
        return item === permission.key;
      });
    } else {
      // 进入else  说明permisson有children 可能是商品或者图表
      //some() 方法测试数组中是不是至少有1个元素通过了被提供的函数测试。它返回的是一个Boolean类型的值。
      return permission.children.some(item => {
        return roles.indexOf(item.key) !== -1;
      });
    }
  };

  render() {
    let pathname = this.props.location.pathname;
    return (
      <div>
        <header className="nav-header">
          <img src={logo} alt="logo" />
          <h1>商品管理后台</h1>
        </header>
        <Menu
          selectedKeys={
            pathname.indexOf("product") !== -1 ? "product" : pathname.split("/").reverse()[0]
          }
          defaultOpenKeys={this.props.location.pathname.split("/").splice(2)}
          mode="inline"
          theme="dark"
        >
          {this.menuDisplay(menuList)}
        </Menu>
      </div>
    );
  }
}
export default LeftNav;
