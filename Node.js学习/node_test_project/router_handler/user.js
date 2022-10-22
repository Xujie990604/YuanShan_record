/*
 * @Author: xujie 1607526161@qq.com
 * @Date: 2022-07-14 19:56:04
 * @LastEditors: x09898 coder_xujie@163.com
 * @LastEditTime: 2022-10-21 10:36:06
 * @FilePath: \HTML-CSS-Javascript-\Node.js学习\node_test_project\router_handler\user.js
 * @Description: 存放 user 模块的路由处理函数
 */

// 导入数据库对象
const db = require('../db/index');
// 导入 bcryptjs 模块用于密码加密
const bcryptjs = require('bcryptjs')
// 导入生成 Token 的包
const jwt = require('jsonwebtoken')
// 导入定义的密钥
const config = require('../config')

/**
 * @description: 注册路由对应的处理函数
 * @param { Object } req 和客户端请求有关的数据
 * @param { Object } res 和服务端响应有关的数据
 * @return { object } 函数的相应信息
 */
const register = (req, res) => {
  // 获取客户端提交到服务器的用户信息
  const userInfo = req.body;

  // 检测用户名是否被占用
  const sqlStr = 'select * from user where username=?';
  db.query(sqlStr, [userInfo.username], (err, results) => {
    // 执行 SQL 语句失败
    if(err) {
      return res.cc(err)
    }
    // 判断用户名是否被占用
    if(results.length > 0) {
      return res.cc('用户名被占用，请更换其他用户名！');
    }

    // 使用 bcryptjs.hashSync() 方法对用户的密码进行加密
    // 参数1: 明文密码
    // 参数2：随机盐的长度
    userInfo.password = bcryptjs.hashSync(userInfo.password, 10)

    // 插入新用户
    const addUserSqlStr = 'insert into user set ?'
    db.query(addUserSqlStr, { username: userInfo.username, password: userInfo.password }, (err, results) => {
      // 执行 SQL 语句失败
      if(err) {
        return res.cc(err)
      }
      // 判断影响行数是否为一
      if(results.affectedRows !== 1) {
        return res.cc('注册用户失败,请稍后再试!');
      }
      // 注册成功
      return res.send({
        status: 1,
        message: '注册成功！'
      })
    })
  })
  
  
}

/**
 * @description: 登录路由对应的处理函数
 * @param { Object } req 和客户端请求有关的数据
 * @param { Object } res 和服务端响应有关的数据
 * @return { object } 函数的相应信息
 */
const login = (req, res) => {
  // 获取客户端提交到服务端的信息
    const userInfo = req.body;
    // 定义查询指定 username 的SQL语句
    const sqlStr= 'select * from user where username=?'
    db.query(sqlStr, userInfo.username, (err, results) => {
      // 执行Sql语句失败
      if(err) {
        return res.cc(err)
      }
      // 执行 Sql 语句成功，但是获取到的数据不等于1
      if(results.length !== 1) {
        return res.cc("登录失败，请稍后再试")
      }
      // 通过 compareSync 方法来比较用户输入的密码和查询得到的密码是否一致, 返回值是布尔值
      const compareResult = bcryptjs.compareSync(userInfo.password, results[0].password)
      if (!compareResult) {
        return res.cc("密码错误，登陆失败！")
      }

      // 在服务器端生成 Token 字符串
      // 去除掉用户信息中的 password 和 user_pic
      const user = { ...results[0], password: "", user_pic: ""}
      // 根据用户的信息来生成 Token 字符串
      const tokenStr = jwt.sign(user, config.jwtSecretKey, { expiresIn: config.expireTime})
      
      // 登录成功之后，将信息响应给客户端
      // TODO: 为什么要在返回给客户端的 Token 中添加一个 Bearer 的前缀
      res.send({
        status: 1,
        message: '登录成功',
        token: `Bearer ` + tokenStr
      }) 
    })
}

// 导出事件处理函数
module.exports = {
    register,
    login
}