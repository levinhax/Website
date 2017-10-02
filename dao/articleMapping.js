// CRUD 语句
var articleSql = {
    insertSql: 'insert into articles(articleTitle, articleDate, articleTag, articleAuthor, articleText) values(?,?,?,?,?)',
    selectByIdSql: 'select * from articles where articleId=?',
    selectAllSql: 'select * from articles where articleAuthor=?',
    selectTop5Sql: 'select * from articles limit 0,5',
    selectOrderByDateSql: 'select * from articles order by articleDate desc',
    selectByTagSql: 'select distinct * from articles',
    selectByTagOrderByDateSql: 'select * from articles where articleTag=? order by articleDate desc',
    deleteSql: 'delete from articles where articleId=?',
    pagingSql: 'select * from articles where articleAuthor=? order by articleId desc limit ?,?',
    selectIdSql: 'select articleId from articles'
};

module.exports = articleSql;