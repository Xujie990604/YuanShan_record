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
