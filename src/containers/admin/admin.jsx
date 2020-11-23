import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { createDeleteUserInfoAction } from "../../redux/actions/login_action";

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
        <div>
          <div>这里是Admin界面, 你的名字是{this.props.userInfo.user.username}</div>;
          <button onClick={this.logout}>logout</button>
        </div>
      );
    }
  }
}

export default connect(state => ({ userInfo: state.userInfo }), {
  deleteUserInfo: createDeleteUserInfoAction,
})(Admin);
