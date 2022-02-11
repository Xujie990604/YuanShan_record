# axios

## axios使用

### 基础的使用

#### 书写形式

```js
//  axios在想设置params和config时，只需要同时定义在第二个参数中，必须显示的声明params这个属性
this.$axios.get('https://jsonplaceholder.typicode.com/posts/', {
       params: {
         id: 2
       },
       timeout: 5000
})

this.$axios({
       method: 'get',
       url: 'https://jsonplaceholder.typicode.com/posts',
       params: {
         id: 4
       },
       timeout: 5000
})

// axios即想设置data的数据又想要设置timeout等属性的时候，需要传递三个参数，第一个是Url，第二个是data，第三个是配置文件
this.$axios
      .post(
        "https://jsonplaceholder.typicode.com/posts",
        {
          title: "xujie",
          body: "baby",
          userId: 1,
        },
        {
          timeout: 50000,
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

### 几种方法

* put只返回必须的id和修改的数据
* patch返回全部的数据

#### params参数

```js
// 专门为get方法指定的属性，用于设置get时 问号形式的参数
axios({
    url: 'http://ww.baidu.com',
    params: {
        type: 'pop',
        page: '1'
    }
})

```

#### data参数

* 在使用post，put，patch时需要使用的参数，用来传递数据
* get请求方法对应的是params属性，post方法对应的是data属性

#### axios的合并请求

```js
axios.all([
        axios.('https://jsonplaceholder.typicode.com/todos?_limit=5'),
        axios.('https://jsonplaceholder.typicode.com/posts?_limit=5')
    ])
    // results是一个数组，里面存储着这两次请求的结果
    .then((results) => {console.log(results)})
    // 也可以使用axios的spread方法，来把请求到的结果分发
    .then(axios.spread((todos,posts) => console.log(todos,posts)))
```

### 默认属性的设置

* 利用axios的defaults属性来设置一些默认全局属性
  
```js
axios.defaults.baseURL = 'http://ww.baidu.com'
axios.defaults.timeout = 5000
```
  
### 创建axios对应的实例

* 我们在进行默认属性的配置时，可能不希望每一次的请求都是相同的默认属性
* 我们可能在整个网站有两个不同的后端接口
* 进行实例的创建时，实例传参数的形式和使用axios一样，既可以传递一整个对象，又可以使用那种声明的形式
* 但是axios的all和spread方法是axios的方法，axios的实例并不具有这些方法。

```js
const instance = axios.create({
    baseURL: 'http://www.baidu.com',
    timeout: 5000
})

// 然后使用创建的这个实例进行接口的访问
instance({
    url:'/home/data',
    method: 'post',
    data: {
        id: 1
    },
    timeout: 5000
})
```

### 模块的封装

* 只要是使用了第三方的模块就要时刻注意以后的维护
* 不要直接在每个使用到第三方的组件中都直接引用第三方插件，要在一个文件中进行对第三方组件的封装，等日后维护时，只需要修改自己的这一个文件

#### 使用回调函数的方法，重点是理解回调函数的含义

```js
// 定义一个js文件，封装自己的网络请求js函数
import axios from 'axios'

export function request(config,success,failure) {
    // 创建axios的实例,放置一些默认的属性
    const instance = axios.create({
        baseURL: 'http://123.207.32.32:8000',
        timeout: 5000
    })

    // 使用axios的实例来执行传进来的参数
    instance(config)
    //但是then和catch方法，本应该是在外面被调用，所以需要使用回调函数
    // 回调函数的定义就是以函数指针的形式参数传进来
    // 然后根据条件回头执行的函数就叫和回调函数
    .then(res => {
        // 如果then条件成立，那么执行success函数
        success(res)
    })
    .catch(err => {
        failure(err)
    })
}

// 在你想要使用的地方使用自己的函数
import {request} from './network/request'

request({
  url: '/home/multidata'
}.res => {
  console.log(res);
}.err => {
  console.log(err);
})
```

#### 最终的方案使用Promise

```js
// 自己封装一个网络请求函数
import axios from 'axios'

export function request(config) {
    // 创建axios的实例,放置一些默认的属性
    const instance = axios.create({
        baseURL: 'http://123.207.32.32:8000',
        timeout: 5000
    })

    // 这种方式不在需要使用回调函数
    // 因为instance本身就是一个axios的实例，就是一个Promise类型的数据
    // 所以直接返回instance，就可以在调用request时直接使用then和catch
    return instance(config);

    // 加入以后的第三方框架不是promise的类型的数据
    // 那就就要return new Promise((resolve,reject) => {
        // 里面是异步的处理代码
    } )
}

// 引入并且使用自己封装的网络请求函数
import {request} from './network/request'

request({
  method: 'get, //方法
  url: '/home/multidata', //url
  params: { //get请求的参数
      _limit: 5
  },
  timeout: 1000 //一些请求的配置
})
.then((res) => {
  console.log(res);
})
```

### axios的拦截器

#### 请求的拦截器

```js
axios.interceptors.request.use(config => {
    console.log(config);
    // 在发送请求之前做点什么
    // 在进行请求拦截的时候们必须把config给返回回去，不然请求的这个过程就没办法继续了
    return config;
},err => {
    console.log(err)
    // 对请求错误做点什么
    // 在进行请求失败拦截的时候们必须把Promise.reject(err)给返回回去
    return Promise.reject(err)
})
```

* 可以在请求拦截的这步把config信息进行一定的修改和加载动画的开启

#### 响应的拦截

```js
axios.interceptors.response.use(res => {
    console.log(res);
    // 在进行响应拦截的时候们必须把res给返回回去，不然请求的这个过程就没办法继续了
    // 也可以直接返回res.data这样的话响应的数据就只有data，没有其他的烂七八糟的数据了
    // 对响应数据做点什么
    return res.data;
},err => {
    console.log(err)
    // 对响应错误做点什么
    return Promise.reject(err)
})
```

### 错误的处理

```js
axios
    .get("https://jsonplaceholder.typicode.com/todoss")
    .then((res) => console.log(res))
    .catch((err) => {
        if(err.response) {
            console.log(err.response.data)
            console.log(err.response.status)
            console.log(err.response.headers)

            if (err.response.status == 404) {
                alert('客户端出现问题');
            }else if(err.response.status >= 500) {
                alert('服务端接口出现问题');
            }
        }else if(err.request) {
        // 请求已经发起，但是没有响应才会执行
            console.log(err.request);
        }else {
            //请求也没有发起，响应也没有
            console.log(err.message);
        }
    });
```