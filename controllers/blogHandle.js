// 实现与MySQL交互
var mysql = require('mysql');
var dbConf = require('../config/dbConf');
var moment = require('moment');
var markdown = require('markdown').markdown;

var articleSql = require('../dao/articleMapping');

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
    select: function(req, res, next) {
        pool.getConnection(function(err, connection) {
            connection.query(articleSql.selectTop5Sql, function(err, result) {
                if (err) {
                    console.log('查询出错');
                    jsonWrite(err);
                } else {
                    for (let i = 0; i < result.length; i++) {
                        console.log('查询结果: ' + result[i].articleTitle);
                    }
                    let blogs = result;
                    // for (let i = 0; i < result.length; i++) {
                    //     blogs[i].articleText = markdown.toHTML(result[i].articleText);
                    // }
                    // let articleLink = "localhost:3000/blog/details/" + param.articleId;
                    res.render('blogs/blog', {
                        blogs: blogs
                    });
                }
                connection.release();
            });
        });
    },

    selectOrderByDate: function(req, res, next) {
        pool.getConnection(function(err, connection) {
            connection.query(articleSql.selectOrderByDateSql, function(err, result) {
                if (err) {
                    console.log('查询出错');
                    jsonWrite(err);
                } else {
                    for (let i = 0; i < result.length; i++) {
                        console.log('查询结果: ' + result[i].articleTitle);
                    }
                    let blogCounts = result.length;
                    let blogs = result;
                    blogs.articleDate = moment(blogs.articleDate).format('YYYY-MM-DD HH:mm:ss');
                    console.log('时间: ' + blogs.articleDate);
                    res.render('blogs/blog_archive.pug', {
                        blogs: blogs,
                        blogCounts: blogCounts
                    });
                }
                connection.release();
            });
        });
    },

    selectByTag: function(req, res, next) {
        pool.getConnection(function(err, connection) {
            connection.query(articleSql.selectByTagSql, function(err, result) {
                if (err) {
                    console.log('查找出错');
                    jsonWrite(err);
                } else {
                    let l = result.length;

                    let tmp = [];
                    for (let i = 0; i < l; i++) {
                        tmp.push(result[i].articleTag);
                    }

                    function unique5(array) {
                        var r = [];
                        for (var i = 0, l = array.length; i < l; i++) {
                            for (var j = i + 1; j < l; j++)
                                if (array[i] === array[j]) j = ++i;
                            r.push(array[i]);
                        }
                        return r;
                    }

                    let tags = unique5(tmp);
                    let tagCounts = tags.length;
                    console.log('标签数量：' + tagCounts);
                    console.log(tags);

                    res.render('blogs/blog_tag', {
                        tags: tags,
                        tagCounts: tagCounts
                    });
                }
                connection.release();
            });
        });
    },

    selectByTagOrderByDate: function(req, res, next) {
        let tagName = req.params.tagName;
        console.log('tagName: ' + tagName);
        pool.getConnection(function(err, connection) {
            connection.query(articleSql.selectByTagOrderByDateSql, tagName, function(err, result) {
                if (err) {
                    console.log('查询出错');
                    // jsonWrite(err);
                } else {
                    for (let i = 0; i < result.length; i++) {
                        console.log('查询结果: ' + result[i].articleTitle);
                    }
                    let tagNum = result.length;
                    let blogs = result;
                    blogs.articleDate = moment(blogs.articleDate).format('YYYY-MM-DD HH:mm:ss');
                    console.log('时间: ' + blogs.articleDate);
                    res.render('blogs/blog_tag_tagName', {
                        blogs: blogs,
                        tagName: tagName
                    });
                }
                connection.release();
            });
        });
    },

    selectById: function(req, res, next) {
        let blogId = req.params.blogId;
        var cur_Id = blogId;
        var articleIdArr = [];
        var prev_Id;
        var next_Id;
        console.log('blogId: ' + blogId);
        // 选择所有的id
        pool.getConnection(function(err, connection) {
            connection.query(articleSql.selectIdSql, function(err, result) {
                if (err) {
                    console.log('查询出错');
                } else {
                    for (let i = 0; i < result.length; i++) {
                        articleIdArr[i] = result[i].articleId;
                    }
                    for (let j = 0; j < articleIdArr.length; j++) {
                        if (articleIdArr[j] == cur_Id) {
                            if (j == 0) {
                                prev_Id = articleIdArr[j];
                            } else {
                                prev_Id = articleIdArr[j - 1];
                            }
                            if (j == articleIdArr.length - 1) {
                                next_Id = articleIdArr[j];
                            } else {
                                next_Id = articleIdArr[j + 1];
                            }
                        }
                    }
                    console.log('prev_Id: ' + prev_Id);
                    console.log('next_Id: ' + next_Id);
                }
            })
        });
        pool.getConnection(function(err, connection) {
            connection.query(articleSql.selectByIdSql, blogId, function(err, result) {
                if (err) {
                    console.log('查询出错');
                    // jsonWrite(err);
                } else {
                    let blog = result[0];

                    res.render('blogs/blog_detail', {
                        blog: blog,
                        prev_Id: prev_Id,
                        next_Id: next_Id
                    });
                }
                connection.release();
            });
        });
    }

};