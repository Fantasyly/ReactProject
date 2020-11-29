const CracoAntDesignPlugin = require("craco-antd"); // 按需引入css
const CracoLessPlugin = require("craco-less"); // 自定义样式

module.exports = {
  plugins: [
    // 自定义样式
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { "@primary-color": "#1DA57A" },
            javascriptEnabled: true,
          },
        },
      },
    },
    // 按需引入css
    { plugin: CracoAntDesignPlugin },
  ],
  babel: {
    // 支持装饰器模式语法
    plugins: [["@babel/plugin-proposal-decorators", { legacy: true }]],
  },
};
