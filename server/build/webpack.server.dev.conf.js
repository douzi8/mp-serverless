const merge = require("webpack-merge");
const baseWebpackConfig = require("./webpack.server.base.conf");

module.exports = merge(baseWebpackConfig("dev"), {
  watch: true,
  watchOptions: {
    ignored: /node_modules/
  },
  stats: "minimal",
  mode: "development",
  // mode: "none",
  plugins: []
});
