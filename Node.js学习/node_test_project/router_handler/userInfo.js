const db = require('../db/index')
const bcrypt = require('bcryptjs')

// 获取用户信息路由对应的处理函数
const userinfo = (req, res) => {
  const sql = `select id, username, nickname, email, user_pic from user where id=?`
  // Token 解析成功之后， express-jwt 插件会在 req 上添加一个 user 属性存放用户的信息
  db.query(sql, req.user.id, (err, result) => {
    if(err) { return res.cc(err) }
    if (result.length !== 1) { return res.cc("查询用户信息失败") }

    // 用户信息获取成功
    res.send({
      status: 200,
      message: '获取用户信息成功',
      data: result
    })
  })
} 

// 更新用户信息路由对应的处理函数
const updateUserInfo = (req, res) => {
  const sql = `update user set ? where id=?`
  db.query(sql, [req.body, req.body.id], (err, result) => {
    if (err) { return res.cc(err) }
    if (result.affectedRows !== 1) { return res.cc("更新用户信息失败") }

    // 用户信息获取成功
    res.send({
      status: 200,
      message: '更新用户信息成功'
    })
  })
}

// 更新密码路由对应的处理函数
const updatePassword = (req, res) => {
  const sql = `select * from user where id=?`
  db.query(sql, req.user.id, (err, result) => {
    if(err) { return res.cc(err) }
    if(result.length !== 1) {
      return res.cc('用户不存在')
    }
    // 判断密码是否一致
    const compareResult = bcrypt.compareSync(req.body.oldPassword, result[0].password)
    if(!compareResult) { return res.cc('旧密码错误') }

    // 定义更新密码的 sql 语句
    const sql = `update user set password=? where id=?`
    const newPassword = bcrypt.hashSync(req.body.newPassword, 10)
    db.query(sql, [newPassword, req.user.id], (err, result) => {
      if(err) { return res.cc(err) }
      if(result.affectedRows !== 1) {
        return res.cc("更新密码失败")
      }
      res.send({
        status: 200,
        message: '密码修改成功'
      })
    })
  })
}

module.exports = {
  userinfo,
  updateUserInfo,
  updatePassword
}