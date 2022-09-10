<!--
 * @Author: xujie 1607526161@qq.com
 * @Date: 2022-04-22 13:11:00
 * @LastEditors: xujie 1607526161@qq.com
 * @FilePath: \HTML-CSS-Javascript-\工具类的知识\编码的书写规范\Vue的书写规范.md
 * @Description: 
-->
# Vue中的书写和命名格式

## 项目结构

## 命名格式

### prop

* 在组件中进行传值的时候使用kebab-case(小写字母，中划线的版本)形式(因为DOM结构中只能不区别大小写，只能使用kebab-case的形式)
* 在组件接收值的时候，使用小驼峰形式。

## 事件

* 在子组件emit和在父组件监听子组件emit的事件时，使用kebab-case形式，但是在父组件中绑定事件和在methods中定义事件的时候，函数的名字要使用小驼峰的格式

### css

* css的类名使用kebab-case(小写字母，中划线的版本)
