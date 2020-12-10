import React, { Component } from "react";
import { Button, Modal } from "antd";
import {
  FullscreenOutlined,
  FullscreenExitOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import screenfull from "screenfull";
import { connect } from "react-redux";
import dayjs from "dayjs";
import { withRouter } from "react-router-dom";
import menuList from "../../../config/menu_config.js";
import { createDeleteUserInfoAction } from "../../../redux/actions/login_action";
import { reqWeather } from "../../../api";
import "./header.less";
const { confirm } = Modal;

@connect(state => ({ userInfo: state.userInfo, title: state.title }), {
  deleteUserInfo: createDeleteUserInfoAction,
})
@withRouter
class Header extends Component {
  state = {
    isFull: false,
    date: dayjs().format("YYYY年 MM月DD日 HH:mm:ss"),
    weather: {},
    title: "",
  };

  componentDidMount() {
    // 给screenfull绑定监听
    screenfull.on("change", () => {
      let isFull = !this.state.isFull;
      this.setState({ isFull });
    });

    /**
     * 定时更新时间
     *  1. 在组件挂载的时候就开始循环设置时间
     *  2. 要小心当退出登录的时候, 这个定时器还开着呢,记得在卸载组件时关闭该定时器
     */
    this.timeId = setInterval(() => {
      let date = dayjs().format("YYYY年 MM月DD日 HH:mm:ss");
      this.setState({ date });
    });

    /**
     * 向和风天气发送请求获取数据
     */
    this.weatherReq();

    /**
     * 获取当前挂载的页面的title
     * 当前页面只会挂载一次
     * 左侧菜单点击的时候  是展示不同的组件
     * 当前header组件只是不断更新
     * 因为有定时器会更新状态里的时间
     * 时间一更新,界面就会刷新,
     * 刷新时会触发willUpdate方法(老生命周期)
     * 新生命周期是这个getDerivedStateFromProps
     * 但是不会再挂载一次了
     * 别想着把更新状态的方法写在willUpdate里
     * 因为在里面更新状态, 状态更新,就会继续触发willUpdate, willUpdate就会继续更新状态
     * 从而陷入死循环
     */
    this.getTitle();
  }

  componentWillUnmount() {
    clearInterval(this.timeId);
  }

  weatherReq = async () => {
    let result = await reqWeather();
    let { temp, text, windDir } = result.now;
    let weather = { temp, text, windDir };
    this.setState({ weather });
  };
  // 切换全屏和非全屏
  fullScreen = () => {
    screenfull.toggle();
  };

  // 退出登录
  logOut = () => {
    let { deleteUserInfo } = this.props;
    confirm({
      title: "您确认要退出吗?",
      icon: <ExclamationCircleOutlined />,
      content: "退出后,将返回至登录界面",
      cancelText: "取消",
      okText: "确定",
      onOk() {
        deleteUserInfo();
      },
      onCancel() {},
    });
  };

  // 通过路径获取当前显示页面的title
  getTitle = () => {
    let pathname = this.props.location.pathname;
    let key = pathname.split("/").reverse()[0];
    if (pathname.indexOf("product") !== -1) {
      key = "product";
    }
    // console.log('header中getTitle' + key);

    // 第一次进入时 首页不显示
    if (key === "admin") {
      key = "home";
    }
    let title = "";
    menuList.forEach(item => {
      if (!item.children) {
        // 如果不是二级列表  那就直接比较
        if (item.key === key) {
          title = item.title;
        }
      } else {
        // 如果是二级列表 那就去比较列表里面的
        let child = item.children.find(childItem => {
          return childItem.key === key;
        });
        if (child) {
          title = child.title;
        }
      }
    });
    this.setState({ title });
  };

  render() {
    let { isFull, date, weather } = this.state;
    let { user } = this.props.userInfo;

    if (isFull) {
      return (
        <header className="header">
          <div className="header-top">
            <span className="username">欢迎, {user.username}</span>
            <Button size="small" id="fullScreen" onClick={this.fullScreen}>
              <FullscreenExitOutlined />
            </Button>
            <Button type="link" onClick={this.logOut}>
              退出登录
            </Button>
          </div>
          <div className="header-bottom">
            <div className="bottom-left">{this.props.title || this.state.title}</div>
            <div className="bottom-right">
              <span id="date">{date}</span>
              <span>{weather.text}</span>
              <span>{weather.temp}°C</span>
              <span>{weather.windDir}</span>
            </div>
          </div>
        </header>
      );
    }

    return (
      <header className="header">
        <div className="header-top">
          <span className="username">欢迎, Admin</span>
          <Button size="small" id="fullScreen" onClick={this.fullScreen}>
            <FullscreenOutlined />
          </Button>
          <Button type="link" onClick={this.logOut}>
            退出登录
          </Button>
        </div>
        <div className="header-bottom">
          <div className="bottom-left">{this.props.title || this.state.title || "出bug了"}</div>
          <div className="bottom-right">
            <span id="date">{date}</span>
            <span>{weather.text}</span>
            <span>{weather.temp}°C</span>
            <span>{weather.windDir}</span>
          </div>
        </div>
      </header>
    );
  }
}
export default Header;
