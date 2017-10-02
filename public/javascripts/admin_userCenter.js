$(function() {
    // 格式化输出时间
    let userTime = $('#userDate').text();
    let userNewTime = formatDate(userTime);
    $('#userDate').text(userNewTime);

    $('#editUser').click(function() {
        $('#userForm').show();
    });
    $('#userCenter').find('.btn_cancel').click(function() {
        $('#userForm').hide();
    });
});