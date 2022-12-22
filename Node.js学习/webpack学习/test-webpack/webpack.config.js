/*
 * @Author: xujie 1607526161@qq.com
 * @Date: 2022-12-17 18:07:09
 * @LastEditors: xujie 1607526161@qq.com
 * @FilePath: \HTML-CSS-Javascript-\Node.js学习\webpack学习\test-webpack\webpack.config.js
 * @Description: 
 */
const path = require('path')
// loader 不需要导入， plugin 需要手动导入
// 打包文件时，会自动删除之前的包在生成新的包
const {cleanWebpackPlugin} = require("clean-webpack-plugin")

module.exports =  {
  entry: "./src/index.js", // 打包文件的入口
  output: {
    path: path.resolve(__dirname, './build'),  // 打包文件的出口
    filename: 'index.js' // 打包生成文件的名字
  },
  module: {
    rules: [
      {
        test: /\.css$/, // 正则表达式
        use: ["style-loader", "css-loader"]  // loader的配置是需要顺序的，先被用到的要放到后面
      },
      {
        test: /\.less$/,
        // less 语法想要把被识别需要经历这三个 loader (且有顺序)
        use: [
          "style-loader",
          "css-loader",
          "less-loader"
        ]
      },
      // {
      //   test: /\.(jpe?g | png | gif | svg)$/,
      //   use: {
      //     loader: "file-loader",
      //     options: {
      //       outputPath: "img",  // 图片资源打包后放到 img 文件夹中
      //       name: "[name]_[hash:6].[ext]" // 规范打包后图片的命名
      //     }
      //   }
      // },
      // {
      //   test: /\.(jpe?g | png | gif | svg)$/,
      //   use: {
      //     loader: "url-loader",
      //     options: {
      //       name: "[name]_[hash:6].[ext]",
      //       limit: 100 * 1024   // 只有 100KB以下的图片才会被 url-loader 转成 base64 URI
      //     }
      //   }
      // },
      {
        // 在 webpack5 之前加载文件需要一些 loader。 webpacK5 之后可以使用资源模块类型(asset module type)来代替之前的loader
        // 资源模块类型(asset module type) 有四种格式，具体情况看文档
        test: /\.(jpe?g | png | gif | svg)$/,
        type: "asset", // 有四种不同的值
        parser: {
          dataUrlCondition: {
            maxSize: 100 * 1024
          }
        }
      }
    ]
  },
  plugins: [
    new cleanWebpackPlugin()
  ]
}