// CRUD sql 语句
var userSql = {
    insertSql: 'insert into users(userName, userPass, userDate, userEmail, userPlace, userAvatar, userRole) values(?,?,?,?,?,?,?)',
    selectAllSql: 'select * from users',
    selectByNameSql: 'select * from users where userName=?',
    selectByEmailSql: 'select * from users where userEmail=?',
    updateSql: 'update users set userAvatar=?where userId=?',
    deleteSql: 'delete from users where userId=?'
};

module.exports = userSql;