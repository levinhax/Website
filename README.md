十一假期没事，就花费了两天时间搭建了一个不成熟的个人网站，自己写点心得吧，安抚下自己躁动的心

### 搭建环境

Node.js
Express
MySQL

### 网站介绍

先上几张图

![网站首页](http://upload-images.jianshu.io/upload_images/5322267-34a525b43015f89f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


![日志](http://upload-images.jianshu.io/upload_images/5322267-00c66526e86a2c59.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


![相册](http://upload-images.jianshu.io/upload_images/5322267-dd90f9d7562d1f20.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![后台登录](http://upload-images.jianshu.io/upload_images/5322267-957cced8ae3ed89f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


![日志列表](http://upload-images.jianshu.io/upload_images/5322267-13f25eb4a5220b1e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


![添加项目](http://upload-images.jianshu.io/upload_images/5322267-c1753627f561f11e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![网站说明](http://upload-images.jianshu.io/upload_images/5322267-d198f34b02f15190.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


网站主要包含三个模块：日志，项目简介和个人相册。[Express](http://www.expressjs.com.cn/)是一个基于 [Node.js](http://nodejs.org/) 平台，快速、开放、极简的 web 开发框架。在网站设计的时候，前台页面使用基本的HTML5、CSS3和原生的JavaScript，实现了响应式页面的静态开发；后台设计的时候使用了bootstrap和jQuery框架。在MySQL数据库设计的时候共建了4个表，用来储存相关信息内容。

### 网站使用

网站源代码可以参考[Github Website](https://github.com)

下载之后进入项目主目录Website，使用 **npm install** 安装所需的模块

使用命令 **npm start** 使该项目运行起来，输入 http://localhost:3000 打开前台页面查看各模块，http://localhost:3000/admin进入后台页面，实现模块的增删改查功能。

后台登录账号：levin1229@163.com
密码：pass1234

mysql 文件在MySQLFile目录下

#### 作为一个新手遇到的问题
- 路由规划
- node mysql实现对数据的基本操作
- 使用pug模板，并使用ejs模板渲染HTML
- pug模板的用法(属性变量的使用，变量循环)
- 分页算法
- express支持markdown语法
- 使用Ajax与后台交互

#### 后期打算完善的功能

- 日志文章实现赞赏功能
- 日志文章实现评论功能
- 增加网站浏览量统计信息
- 图形化用户信息


##### mysql 文件在MySQLFile目录下