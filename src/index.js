import React from "react";
import ReactDom from "react-dom";
import App from "./App";
import store from "./redux/store";
import { Provider } from "react-redux";

// Provider是顶层容器 把store传下去 react-redux就可以在里面拿到状态等信息
ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
