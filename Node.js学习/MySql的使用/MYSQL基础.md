<!--
 * @Author: xujie 1607526161@qq.com
 * @Date: 2022-04-22 13:10:58
 * @LastEditors: xujie 1607526161@qq.com
 * @LastEditTime: 2022-07-14 12:06:06
 * @FilePath: \HTML-CSS-Javascript-\Node.js学习\MySql的使用\MYSQL基础.md
 * @Description: 数据库学习
-->
# MYSQL

* 关系型数据库
* 安装位置和数据存放位置都在 D://DataSpace/mysql
* mysql密码： xujie123

## SQL语句

* sql语句大小写不敏感
* 表名 列名 大小写敏感

* sql主句

```sql
-- 从 指定表名称 中查询出 所有 的数据
select * from 表名称

-- 从 指定表名称 中查询出 指定列 的数据
select 列名称 from 表名称

-- 向 指定数据表 中插入数据
insert into 指定表 (列1， 列2) values (值1， 值2)

-- 当满足某个条件时，在 指定数据表中 更新数据 (=两端不准有空格)
update 指定数据表 set 列名1='值', 列名2='值2' where `列名3`='值3'

-- 当满足某个条件时，在 是指定数据表 删除数据
delete from 指定表名称 where 列名='值'
```

* where子句 限定条件

1. and
2. or

* order by 子句(默认升序排序)

1. asc 关键字是指定升序排序
2. desc 关键字是指定降序排序

```sql
-- 得到的数据先按照status降序排序，在按照username升序排序
select * from user order by status DESC, username asc

```

* count(*)函数用于返回查询结果的总数据条数

* as 关键字可以给列去设置别名