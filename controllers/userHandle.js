// 实现与MySQL交互
var mysql = require('mysql');
var dbConf = require('../config/dbConf');
var userSql = require('../dao/userMapping');

// 使用DBConfig.js的配置信息创建一个MySQL连接池
//var pool  = mysql.createPool($util.extend({}, $conf.mysql));
var pool = mysql.createPool(dbConf.mysql);

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

// 时间日期格式化
var formatDateTime = function(date) {
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    var h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    var minute = date.getMinutes();
    minute = minute < 10 ? ('0' + minute) : minute;
    var second = date.getSeconds();
    second = second < 10 ? ('0' + second) : second;
    return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
};

module.exports = {
    register: function(req, res, next) {
        pool.getConnection(function(err, connection) {
            // 获取前台页面传来的参数
            let param = req.body;
            let userDate = formatDateTime(new Date());
            console.log('日期: ' + userDate);
            // 建立连接，向表中插入数据
            // insertSql: 'insert into users(userName, userPass, userDate, userEmail, userPlace, userAvatar, userRole) values(?,?,?,?,?,?,?)',
            connection.query(userSql.insertSql, [param.userName, param.userPass, userDate, param.userEmail, param.userPlace, 'avatar.jpg', 1], function(err, result) {
                if (err) {
                    console.log('添加出错');
                    // jsonWrite(res, err);
                    res.render('404.html');
                } else {
                    console.log('用户添加成功');
                    res.redirect('/user/login');
                }
                connection.release();
            });
        });
    },

    selectByName: function(req, res, next) {
        let userName = req.body.userName;
        console.log("获取到的userName:" + userName);
        // selectByNameSql: 'select * from users where userName=?',
        pool.getConnection(function(err, connection) {
            connection.query(userSql.selectByNameSql, userName, function(err, result) {
                if (err) {
                    console.log('查询用户名出错');
                    // jsonWrite(res, err);
                } else {
                    if (result[0]) {
                        res.send({
                            status: 'success',
                            code: 1,
                            msg: '用户名已被占用'
                        });
                    }
                }
                connection.release();
            });
        });
    },

    selectByEmail: function(req, res, next) {
        let userEmail = req.body.userEmail;
        console.log("获取到的userEmail:" + userEmail);
        // selectByEmailSql: 'select * from users where userEmail=?',
        pool.getConnection(function(err, connection) {
            connection.query(userSql.selectByEmailSql, userEmail, function(err, result) {
                if (err) {
                    console.log('查询邮箱出错');
                    // jsonWrite(res, err);
                } else {
                    if (result[0]) {
                        res.send({
                            status: 'success',
                            code: 2,
                            msg: '邮箱已被注册'
                        });
                    }
                }
                connection.release();
            });
        });
    },


    login: function(req, res, next) {
        let userEmail = req.body.userEmail;
        let userPass = req.body.userPass;
        console.log("获取到的userEmail:" + userEmail);
        // selectByEmailSql: 'select * from users where userEmail=?',
        pool.getConnection(function(err, connection) {
            connection.query(userSql.selectByEmailSql, userEmail, function(err, result) {
                if (err) {
                    console.log('查询出错');
                    // jsonWrite(res, err);
                    res.send({
                        status: "success",
                        code: '-1'
                    });
                } else {
                    if (result[0]) {
                        if (userPass == result[0].userPass) {
                            req.session.islogin = result[0];
                            res.locals.islogin = req.session.islogin;
                            res.cookie('islogin', res.locals.islogin, {
                                // maxAge: 60 * 60 * 24 * 3  过期时间3天
                                maxAge: 60 * 60
                            });
                            res.redirect('/admin');
                            // res.send({
                            //     status: 'success',
                            //     code: 2,
                            //     msg: '信息正确'
                            // });
                        } else {
                            res.send({
                                status: 'success',
                                code: 1,
                                msg: '密码有误'
                            });
                        }
                    } else {
                        res.send({
                            status: 'success',
                            code: 0,
                            msg: '邮箱不存在'
                        });
                    }
                }
                connection.release();

            });
        });
    },

    updateAvatar: function(req, res, next) {
        let param = req.body;
        let userId = req.session.islogin.userId;
        console.log('图像: ' + param.userAvatar);
        // updateSql: 'update users set userAvatar=?where userId=?',
        pool.getConnection(function(err, connection) {
            connection.query(userSql.updateSql, [param.userAvatar, userId], function(err, result) {
                if (err) {
                    console.log('更新出错');
                } else {
                    console.log('更新成功');
                    res.redirect('/admin/usercenter');
                }
            });
        });
    },


    blogLogin: function(req, res, next) {
        let pageUrl = req.params;
        console.log(pageUrl);
        let userEmail = req.body.userEmail;
        let userPass = req.body.userPass;
        console.log("获取到的userEmail:" + userEmail);
        // selectByEmailSql: 'select * from users where userEmail=?',
        pool.getConnection(function(err, connection) {
            connection.query(userSql.selectByEmailSql, userEmail, function(err, result) {
                if (err) {
                    console.log('查询出错');
                    // jsonWrite(res, err);
                    res.send({
                        status: "success",
                        code: '-1'
                    });
                } else {
                    if (result[0]) {
                        if (userPass == result[0].userPass) {
                            req.session.islogin = result[0];
                            res.locals.islogin = req.session.islogin;
                            res.cookie('islogin', res.locals.islogin, {
                                // maxAge: 60 * 60 * 24 * 3  过期时间3天
                                maxAge: 60 * 60
                            });
                            res.redirect('/blog');
                        } else {
                            res.send({
                                status: 'success',
                                code: 1,
                                msg: '密码有误'
                            });
                        }
                    } else {
                        res.send({
                            status: 'success',
                            code: 0,
                            msg: '邮箱不存在'
                        });
                    }
                }
                connection.release();

            });
        });
    }


};