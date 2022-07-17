/*
 * @Author: xujie 1607526161@qq.com
 * @Date: 2022-07-14 19:56:04
 * @LastEditors: xujie 1607526161@qq.com
 * @LastEditTime: 2022-07-17 16:31:40
 * @FilePath: \HTML-CSS-Javascript-\Node.js学习\node_test_project\router_handler\user.js
 * @Description: 专门负责存放每个路由的处理函数
 */

// 导入数据库对象
const db = require('../db/index');
// 导入 bcryptjs 模块用于密码加密
const bcryptjs = require('bcryptjs')

/**
 * @description: 注册路由对应的处理函数
 * @param { Object } req 和客户端请求有关的数据
 * @param { Object } res 和服务端响应有关的数据
 * @return { none }
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
 * @param {*} req
 * @param {*} res
 * @return {*}
 */
const login = (req, res) => {
    res.send("login OK")
}

// 导出事件处理函数
module.exports = {
    register,
    login
}