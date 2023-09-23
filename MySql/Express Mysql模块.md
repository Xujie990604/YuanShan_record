# mysql模块

## mysql模块的引入

```js
// 引入mysql模块
const mysql = require('mysql')
// 连接本地数据库
const db = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'xujie123',
    database: 'YuanShan'
})

// 查询数据
const sqlStr = 'select * from user';

db.query(sqlStr, (err, results) => {
    // 如果失败的话，打印错误信息
    if(err) return console.log('执行失败', err.message)
    // 如果成功的话，打印结果
    console.log('执行成功', results)
})
```

### 执行sql语句

#### 查询语句

```js
// 查询数据库的语句
const sqlStr = 'select * from user';

db.query(sqlStr, (err, results) => {
    // 如果失败的话，打印错误信息
    if(err) return console.log('执行失败', err.message)
    // 如果成功的话，打印结果
    // 查询成功返回的数据是对象数组(数据库中的信息)
    console.log('执行成功', results)
})
```

#### 插入语句

```js
// 插入数据
const user = { username: 'test-vue', password: 'vue123' }
// 插入的sql语句，使用 ? 表示占位符
const sqlStr = 'insert into user (username, password) values (?, ?)'

// 传入数据的话，使用[]来填充 sql语句 中的占位符
db.query(sqlStr, [user.username, user.password], (err, results) => {
    // 如果失败的话，打印错误信息
    if(err) return console.log('执行失败', err.message)
    // 如果成功的话，打印结果
    // 插入数据的话，如果 affectedRows 属性为1，代表着插入成功
    if(results.affectedRows === 1){ console.log("插入数据成功") }
}

const user = { username: 'test-vue1', password: 'vue1234' }
// 如果需要插入的数据和数据库中的字段一一对应的话，可以使用这种简单的方式
const sqlStr = 'insert into user set ?'

db.query(sqlStr, user, (err, results) => {
    if(err) return console.log('执行失败', err.message)
    if (results.affectedRows === 1) { console.log("插入数据成功") }
})
```

#### 更新数据

```js
// 需要更新的数据
const user = { id: 2, username: 'update', password: 'update123' }
// 更新的sql语句
const sqlStr = 'update user set username=?, password=? where id=?'

db.query(sqlStr, [user.username, user.password, user.id], (err, results) => {
    // 如果失败的话，打印错误信息
    if(err) return console.log('执行失败', err.message)
    // 如果成功的话，打印结果
    if (results.affectedRows === 1) { console.log("更新数据成功") }
})


// 需要更新的数据
const user = { id: 2, username: 'update123', password: 'update123' }
// 更新的sql语句
// 如果更新的数据和数据库字段能够一一对应的话，可以使用这种简单的传值方式
const sqlStr = 'update user set ? where id=?'

db.query(sqlStr, [user, user.id], (err, results) => {
    // 如果失败的话，打印错误信息
    if(err) return console.log('执行失败', err.message)
    // 如果成功的话，打印结果
    if (results.affectedRows === 1) { console.log("更新数据成功") }
})
```

#### 删除数据

```js
//  删除的sql语句
const sqlStr = 'delete from user where id=?'
// 如果sql语句中只有一个占位符的话，在query方法中可以不使用数组包裹
db.query(sqlStr, 2, (err, results) => {
    // 如果失败的话，打印错误信息
    if(err) return console.log('执行失败', err.message)
    // 如果成功的话，打印结果
    if (results.affectedRows === 1) { console.log("删除数据成功") }
})
```
