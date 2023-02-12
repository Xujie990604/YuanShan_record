<!--
 * @Author: xujie 1607526161@qq.com
 * @Date: 2022-04-22 13:10:58
 * @LastEditors: xujie 1607526161@qq.com
 * @LastEditTime: 2023-02-11 23:08:57
 * @FilePath: \HTML-CSS-Javascript-\Vue框架\vue axios\axios.md
 * @Description: 
-->
# axios

```js

this.$axios({
       method: 'get',
       url: 'https://jsonplaceholder.typicode.com/posts',
       params: {
         id: 4
       },
       timeout: 5000
})

this.$axios({
      method: 'post',
      url: 'https://jsonplaceholder.typicode.com/posts',
      data: {
        title: "xujie",
        body: "baby",
        userId: 1,
      },
      timeout: 5000
})
```