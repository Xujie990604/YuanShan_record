/*
 * @Author: xujie 1607526161@qq.com
 * @Date: 2022-07-14 19:56:04
 * @LastEditors: xujie 1607526161@qq.com
 * @LastEditTime: 2022-07-14 20:32:20
 * @FilePath: \HTML-CSS-Javascript-\Node.js学习\node_test_project\router_handler\user.js
 * @Description: 专门负责存放每个路由的处理函数
 */

/**
 * @description: 注册路由对应的处理函数
 * @param { Object } req 和客户端请求有关的数据
 * @param { Object } res 和服务端响应有关的数据
 * @return { none }
 */
const register = (req, res) => {
    res.send("register OK")
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