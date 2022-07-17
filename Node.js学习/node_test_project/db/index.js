// 导入mysql模块
const { request } = require('express');
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