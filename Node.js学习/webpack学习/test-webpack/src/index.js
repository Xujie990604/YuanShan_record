/*
 * @Author: xujie 1607526161@qq.com
 * @Date: 2022-12-17 14:42:29
 * @LastEditors: xujie 1607526161@qq.com
 * @FilePath: \HTML-CSS-Javascript-\Node.js学习\webpack学习\test-webpack\src\index.js
 * @Description: 
 */
import { name } from './js/a'
const { age } = require('./js/b')
require('./css/style.css')


console.log(name, age)