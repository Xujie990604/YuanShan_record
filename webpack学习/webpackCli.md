# cli

`"build": "webpack --config wk.config.js"`

* 在执行 npm run build 时，会使用 webpack cli 来处理命令行中的参数，并通过参数构建 compiler 对象，然后对代码进行打包(webpack cli 对于打包不是必须的，因为可以使用默认参数打包)。
* 通常在执行 webpack 时会添加一些额外参数(入口，出口，指定配置文件....)

```js
// 命令行参数除了显式的 --config wk.config.js 还会有一个固定的参数
[
  'E:\nodejs\node.exe',
  'D:\webpack\node_modules\webpack\bin\webpack.js',
  '--config',
  'wk.config.js'
]
```

* webpack cli 会提供一些方便的命令，例如 npx webpack init, 初始化一个 webpack 文件。并且会询问很多事项(像 Vue cli 一样 )
