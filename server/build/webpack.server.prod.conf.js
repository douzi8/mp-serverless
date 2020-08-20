const merge = require("webpack-merge");
const baseWebpackConfig = require("./webpack.server.base.conf");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = merge(baseWebpackConfig("prod"), {
  mode: "production",
  optimization: {
    moduleIds: "hashed",
    minimize: false
  },
  plugins: [
    // 每次编译删除dist目录
    new CleanWebpackPlugin()
  ]
});
