/*
 * @Author: x09898 coder_xujie@163.com
 * @Date: 2022-07-18 13:38:36
 * @LastEditors: x09898 coder_xujie@163.com
 * @FilePath: \HTML-CSS-Javascript-\Node.js学习\node_test_project\db\index.js
 * @Description: 数据库连接文件
 */
// 导入mysql模块
const mysql = require('mysql');

// 创建数据库连接对象
const db = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: 'xujie123',
  database: 'YuanShan'  // 数据库的名字
})

// 导出 db 数据库连接对象
module.exports = db;