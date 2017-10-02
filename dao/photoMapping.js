// CRUD 语句
var photoSql = {
    insertSql: 'insert into photos(photoTitle, photoDate, photoAuthor, photoTag, photoImg, photoDesc) values(?,?,?,?,?,?)',
    selectAllSql: 'select * from photos where photoAuthor=?',
    pagingSql: 'select * from photos where photoAuthor=? order by photoId desc limit ?,?',
    selectOrderByDateSql: 'select * from photos order by photoDate desc',
    deleteSql: 'delete from photos where photoId=?',
};

module.exports = photoSql;