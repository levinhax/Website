// 实现与MySQL交互
var mysql = require('mysql');
var dbConf = require('../config/dbConf');

var projectSql = require('../dao/projectMapping');

// 向前台返回JSON方法的简单封装
var jsonWrite = function(res, result) {
    if (typeof result === 'undefined') {
        res.json({
            code: '1',
            msg: '操作失败'
        });
    } else {
        res.json(result);
    }
};

var pool = mysql.createPool(dbConf.mysql);

module.exports = {
    add: function(req, res, next) {
        pool.getConnection(function(err, connection) {
            let param = req.body;
            let projectAuthor = req.session.islogin.userName;
            // 建立连接，向表中插入值
            // insertSql: 'insert into projects(projectTitle, projectAuthor, projectTime, projectTag, projectPhoto) values(?,?,?,?,?)'
            connection.query(projectSql.insertSql, [param.projectTitle, projectAuthor, param.projectTime, param.projectTag, param.projectPhoto], function(err, result) {
                if (err) {
                    console.log('添加出错');
                    jsonWrite(res, err);
                } else if (result) {
                    console.log('作品添加成功');
                    res.redirect('/admin/project');
                }
            });
        });
    },

    // 分页展示
    selectAll: function(req, res, next) {
        pool.getConnection(function(err, connection) {
            let pageNow = +req.query.page;
            if (isNaN(pageNow)) {
                pageNow = 1; //当前页，默认值为1,第一页
            }
            var itemSize = 10; //每一页显示的查询条数,设置为10
            let pageNum = 5; //每一页显示的页码数，自定义
            let pageStart; //每一页的页码起始数，由pageNow和pageNum动态计算
            let pageEnd; //每一页的页码结尾数 ，由pageNow和pageNum动态计算
            var pageCount = 0; // 总页数
            console.log('获取到的当前页: ' + (pageNow));
            // SELECT * FROM table_name LIMIT 0,10;
            let numStart = (pageNow - 1) * itemSize;
            let param = {
                numStart: numStart,
                itemSize: itemSize
            };

            var userName = req.session.islogin.userName;
            // selectAllSql: 'select * from projects where projectAuthor=?',
            connection.query(projectSql.selectAllSql, userName, function(err, result) {
                if (err) {
                    console.log('查询总数据有误');
                    jsonWrite(res, err);
                } else {
                    let numOfResult = result.length; // 查询出的结果总数,与itemSize相等
                    pageCount = Math.ceil(numOfResult / itemSize); //总页数
                    console.log('总页数：' + pageCount);
                    // connection.release();
                }
            });
            // pagingSql: 'select * from projects where projectAuthor=? limit ?,?',
            connection.query(projectSql.pagingSql, [userName, param.numStart, param.itemSize], function(err, result) {
                if (err) {
                    console.log('数据查询有误');
                    // req.flash('error', 数据查询有误);
                } else if (result) {
                    // 模拟百度分页算法 
                    if (pageNow <= pageNum / 2 + 1) {
                        pageStart = 1;
                        pageEnd = pageNum;
                    } else if (pageNow > pageNum / 2 + 1) {
                        pageStart = pageNow - Math.floor(pageNum / 2);
                        pageEnd = pageNow + Math.floor(pageNum / 2);
                    }
                    // 对pageEnd 进行校验，并重新赋值 
                    if (pageEnd > pageCount) {
                        pageEnd = pageCount;
                    }
                    if (pageEnd <= pageNum) {
                        // 当不足pageNum数目时，要全部显示，所以pageStart要始终置为1 
                        pageStart = 1;
                    }

                    let pageNumOfArr = pageEnd - pageStart + 1;
                    console.log('pageStart: ' + pageStart);
                    console.log('pageEnd: ' + pageEnd);
                    let pagesArr = new Array(); //每一页显示的页码数，转成数组

                    var len = pagesArr.length;
                    console.log('数组长度1： ' + len);
                    for (let i = pageStart; i <= pageEnd; i++) {
                        pagesArr.push(i);
                    }
                    console.log('数组长度: ' + pagesArr.length);

                    for (let j = 0; j < pagesArr.length; j++) {
                        console.log(j);
                    }

                    for (let i = 0; i < result.length; i++) {
                        console.log('查询结果: ' + result[i].projectTitle);
                    }
                    let projects = result;
                    req.session.projects = projects;
                    // var userName = req.session.islogin.userName;
                    res.render('backstage/admin_project', {
                        userName: userName,
                        projects: projects,
                        pageCount: pageCount,
                        pagesArr: pagesArr,
                        pageNow: pageNow,
                        pageStart: pageStart,
                        pageEnd: pageEnd
                    });
                }
                connection.release();
            });
        });
    },

    delete: function(req, res, next) {
        pool.getConnection(function(err, connection) {
            let projectId = +req.query.id;
            console.log('获取到的articleId: ' + projectId);
            connection.query(projectSql.deleteSql, projectId, function(err, result) {
                if (err) {
                    console.log('删除失败');
                    jsonWrite(res, err);
                } else {
                    console.log('删除成功');
                    res.redirect('/admin/project');
                }
                connection.release();
            });
        });
    },

    showAll: function(req, res, next) {
        pool.getConnection(function(err, connection) {
            var userName = 'levinhax';
            // selectAllSql: 'select * from projects where projectAuthor=?',
            connection.query(projectSql.selectAllSql, userName, function(err, result) {
                if (err) {
                    console.log('查询总数据有误');
                    jsonWrite(res, err);
                } else {
                    let projects = result;
                    res.render('projects/project', {
                        projects: projects
                    });
                }
                connection.release();
            });
        });
    }



}