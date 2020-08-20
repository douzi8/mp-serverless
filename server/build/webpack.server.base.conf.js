/**
 * 中文文档: https://webpack.docschina.org/concepts/loaders
 */
const path = require("path");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const { getFunctionsEntry } = require("./util");

function webpackBaseConfig(env) {
  const forkTsOptions = {
    eslint: false,
    async: false,
    reportFiles: ["./src/*.ts"]
  };

  if (env === "dev") {
    Object.assign(forkTsOptions, {
      eslint: false,
      async: true
    });
  }

  const config = {
    entry: getFunctionsEntry,

    target: "node",
    node: {
      __dirname: false,
      __filename: false
    },

    /**
     * output.libraryTarget
     * - amd
     * - commonjs, commonjs2
     */
    output: {
      path: path.resolve("functions"),
      filename: "[name].js",
      // chunk文件名称
      chunkFilename: "[name].js",
      publicPath: "/",
      libraryTarget: "commonjs"
    },
    module: {
      rules: [
        {
          test: /\.(j|t)s?$/,
          include: [path.resolve("src")],
          use: {
            loader: "babel-loader",
            options: {
              presets: [
                [
                  "@babel/preset-env",
                  {
                    targets: ["node 8.9"],
                    useBuiltIns: false,
                    // useBuiltIns: "usage",
                    // corejs: 3,
                    /**
                     * 插件数组，这些插件总是被使用（即使目标环境不需要）。
                     * include和exclude选项仅能作用于包含在预设里的插件
                     * https://babeljs.io/docs/en/babel-preset-env
                     * https://github.com/babel/babel/blob/master/packages/babel-compat-data/scripts/data/plugin-features.js
                     */
                    include: [],
                    /**
                     * 排除babel-preset-env预设默认加载插件及Built-ins
                     */
                    exclude: [
                      // "babel-plugin-transform-async-to-generator",
                      // "babel-plugin-transform-regenerator"
                    ]
                  }
                ],
                "@babel/preset-typescript"
              ],
              plugins: [
                [
                  "@babel/plugin-proposal-decorators",
                  {
                    legacy: true
                  }
                ],
                [
                  "@babel/plugin-proposal-class-properties",
                  {
                    loose: true
                  }
                ],
                "@babel/plugin-transform-runtime"
              ]
            }
          }
        }
      ]
    },
    resolveLoader: {
      // 去哪些目录下寻找 Loader，有先后顺序之分
      modules: [path.resolve("node_modules")]
    },
    // 解析模块请求的选项
    resolve: {
      alias: {
        "@": path.resolve("src")
      },
      extensions: [".ts", ".js"],
      modules: [path.resolve("node_modules")]
    },
    externals: [],
    optimization: {
      runtimeChunk: false
    },
    /**
     * loader 用于转换某些类型的模块，而
     * 插件则可以用于执行范围更广的任务。包括：打包优化，资源管理，注入环境变量
     */
    plugins: [new ForkTsCheckerWebpackPlugin(forkTsOptions)]
  };

  return config;
}

module.exports = webpackBaseConfig;
