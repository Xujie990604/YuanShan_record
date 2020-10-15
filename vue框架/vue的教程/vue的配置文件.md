# 配置文件

## 别名

* 系统默认的配置@是文件夹src
* 在DOM结构中使用别名的时候，需要加上~

```js
configureWebpack: {
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
```