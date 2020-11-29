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
import { createDeleteUserInfoAction } from "../../../redux/actions/login_action";
import { reqWeather } from "../../../api";
import "./header.less";
const { confirm } = Modal;

@connect(state => ({ userInfo: state.userInfo }), {
  deleteUserInfo: createDeleteUserInfoAction,
})
@withRouter
class Header extends Component {
  state = {
    isFull: false,
    date: dayjs().format("YYYY年 MM月DD日 HH:mm:ss"),
    weather: {},
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
            <div className="bottom-left">{this.props.history.location.pathname}</div>
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
          <div className="bottom-left">{this.props.history.location.pathname}</div>
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
