# 配置文件

1. 在vue ui的图形化界面中可以修改配置
2. 在node module的@vue下面的cli-serve下面的lib下面的service文件中隐藏了很多的配置
3. 可以自己创建一个文件用来写配置，文件的名字必须叫vue.config.js

```js
module.exports = {
   configureWebpack: {
    //起别名 系统默认的配置@是文件夹src
    // 在DOM中使用别名的话，需要加上~
        resolve: {
            alias: {
                'assets': '@/assets',
                'common': '@/common',
                'components': '@/components',
                'network': '@/network',
                'views': '@/views',
            }
        }
    }
}
```