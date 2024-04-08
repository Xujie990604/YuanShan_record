# Vue3 + Vite

## public

- 此文件夹中的内容会被直接放到 `dist`目录下（文件的名字和路径不会更改）
- ！不适用于普通的静态资源文件，只有需要用到 `public`的特性时再使用（详细介绍请移步 `Vue Cli`官网下的 `HTML和静态资源`）
- 适用 `绝对路径`引入资源文件

## src

- 存放业务代码的文件目录

### assets

- 存放 `静态资源` 的文件目录
- 使用 `相对路径`引入

#### common.css

- 针对常见的场景，编写成组的 CSS 规则。在开发时可以直接通过添加类名的方式来获得 CSS 规则集

```less
/* web-common 允许开发者决定是否要使用这些 CSS rules */
.web-common {
  .el-dialog {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .light-green {
    line-height: 30xp;
    border: none;
    background-color: #58A14F;
    &:hover {
      background-color: #91EFE1;
    }
    &:active {
      background-color: #19C8AD;
    }
  }
}
```

### base-ui

- 和业务无关的  `基础公共组件`
- 遵守 `单一出口`原则，所有需要导出的内容(eg: 组件，常量，配置文件等)都要几种在 `index.js`中导出
- 编写此模块需要遵守 `公共模块编写规范`

> 导出的示例写法

```javascript
import searchBox from './src/search-box.vue'
import boxType from './constant/index'
import boxConfig from './config/index'
// 组件为默认导出
export { boxType, boxConfig, searchBox as default }
```

> 导入的示例写法

```javascript
import searchbox, { boxType, boxConfig } from '@/baseUI/index'
```

### components

- 和业务相关的 `公共组件`
- 遵守 `单一出口`原则。导入，导出的实例写法同上
- 编写此模块需要遵守 `公共模块编写规范`

### config

- `应用级别`的配置信息
- 动态配置信息 eg:  用户权限(根据用户类型生成权限列表)，设备支持功能(根据设备类型生成功能列表)
- 静态配置信息 eg:  白名单

### constant

- `应用级别`的常量或者枚举类型
- eg:  API接口， 地区代码， 设备类型， 用户类型

### global

- main.js 中不应该有过多的代码，需要将过多的逻辑拆分到 global/index.js 文件中
- global/index.js 可以根据插件类别，或者功能进行进一步拆分 （eg:  register-element.js）

```javascript
// global/index.js

import ElementUI from './register-element'
// 引入全局 CSS 文件
import '../assets/css/common.scss'
// 引入 格式化 CSS 文件
import 'normalize.css'
export default function (vue) {
  vue.use(ElementUI)
}

// global/register-element.js

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
export default ElementUI

// main.js
// 所有的第三方插件都交给 registerApp 函数注册
import Vue from 'vue'
import registerApp from './global/index'
registerApp(Vue)
```

### router

- 应用的路由配置文件

### store

- 应用的全局状态管理文件
- 在 Vue2 中使用 Vuex 作为全局状态的管理工具

### service

- API 请求相关的目录
- `service` 目录的分割需要同 `view`保持一致
- service 的 `设计思路` 和 `使用手册`请移步至 `Vue2 Service 使用手册`

### utils

- `应用级别`的工具函数目录
- 需要按照功能进一步划分目录（eg: tree-util.js，time-format.js，form-validata.js）
- ！不要在工具函数文件中添加并不通用的函数(eg: 针对某个 API 的调用函数，强耦合于某个组件的功能函数)
- ！工具函数分为 `应用级别`和 `路由级别`。请不要所有工具函数一股脑都放到 `应用级别`中
- 编写此模块需要遵守 `公共模块编写规范`

### views

- 视图文件目录的划分需要参考 Router（基本上每个文件夹对应着一个页面）
- 如果某个 Router 过大，还可以按照 `页面结构`（eg: header，footer,  content）或者 `逻辑功能`进行再次划分
- 每个文件夹的 `根组件`中不需要写具体的业务逻辑，主要用来 `组合`子组件和编写 `组件通信代码`

#### config

- `路由级别`的配置文件
- 除了 `级别`不同之外，剩下的和 `应用级别`配置文件保持一致

#### constant

- `路由级别`的常量 && 枚举类型
- 除了 `级别`不同之外，剩下的和 `应用级别`constant 保持一致

#### utils

- `路由级别`的工具函数
- 除了 `级别`不同之外，剩下的和 `应用级别`utils 保持一致

#### cpts

- 当前路由下，`入口组件`所 `依赖`的 `子组件`
- 父子组件在命名时需要包含相同的 `前缀`(eg: login-from.vue（父）, login-form-account.vue（子）, login-form-phone.vue（子） )

## 公共模块编写规范

- 需要严格按照 `WEB 项目编程规约`中的约束来进行代码编写，目录，文件命名，代码注释

### 公共组件

- Vue 组件的 `prop`不允许使用数组的形式进行声明，必须以对象的形式说明，且至少包含 `type``default`这两个属性

```javascript
// good
props: {
  direction: {
    type: String,
    default: "left",
  },
},

// bad
props: ['direction'],
```

### 公共函数

1. 简要介绍函数的功能
2. 添加函数的入参说明
3. 添加函数的返回值说明

```javascript
/**
* @description: 计算两数之和
* @param { number } num1 第一个数 
* @param { number } num2 第二个数 
* @returns { number } 两数之和
*/
export function addNumber(num1, num2) {
  return num1 + num2;
}
```

## 命名约束

### 目录命名约束

- 全部采用小写方式， 以中划线分隔，有复数结构时，要采用复数命名法， 缩写不用复数

```js
// bad 
script/style/demo_scripts/demoStyle/imgs/doc

// good
scripts/styles/components/images/utils/layouts/demo-style/demo-scripts/img/doc
```

### JS、CSS、SCSS、HTML、PNG、Vue 文件命名

- 全部采用小写方式， 以中划线分隔

```js
// bad
renderDom.js/UserManagement.html

// good
render-dom.js/signup.css/index.html/company-logo.png
```

### 命名严谨性

- 代码中的命名严禁使用拼音与英文混合的方式，更不允许直接使用中文的方式。 说明：正确的 英文拼写和语法可以让阅读者易于理解，避免歧义。注意，即使纯拼音命名方式也要避免采用

```js
// bad
DaZhe [打折]  /  getPingfenByName() [评分]   /  int 年龄 = 18 

// good
zhejiang/hangzhou/rmb        等国际通用的名称，可视为英文
```

> 尽量少使用缩写，因为缩写会严重减低可读性

### 命名限制

- 禁止在`代码`和 `注释`中出现任何同公司，产品，开发者姓名，工号相关的内容。
- 禁止在`代码` 和`注释`中出现侮辱性词汇

```js
// 1. 公司相关
uniview SMB
// 2.产品相关
UCS ezcloud
```
