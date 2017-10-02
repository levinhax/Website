//密码必须包含数字和字母 
function CheckPassWord(password) {
    let str = password;
    if (str == null || str.length < 8 || str.length > 18) {
        // alert('密码长度应为8~18, 请重新输入');
        $('#alert_msg').text('密码长度应为8~18, 请重新输入');
        return false;
    }
    var reg = new RegExp(/^(?![^a-zA-Z]+$)(?!\D+$)/);
    if (reg.test(str)) {
        return true;
    } else {
        $('#alert_msg').text('密码必须包含数字和字母');
        // alert('密码必须包含数字和字母');
        return false;
    }
}