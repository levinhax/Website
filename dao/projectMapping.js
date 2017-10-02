// CRUD 语句
var projectSql = {
    insertSql: 'insert into projects(projectTitle, projectAuthor, projectTime, projectTag, projectPhoto) values(?,?,?,?,?)',
    selectAllSql: 'select * from projects where projectAuthor=?',
    pagingSql: 'select * from projects where projectAuthor=? limit ?,?',
    deleteSql: 'delete from projects where projectId=?',
};

module.exports = projectSql;