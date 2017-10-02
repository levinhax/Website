//密码必须包含数字和字母 
function CheckPassWord(password) {
    let str = password;
    if (str == null || str.length < 8 || str.length > 18) {
        // alert('密码长度应为8~18, 请重新输入');
        $('#alert_msg').text('密码长度应为8~18, 请重新输入');
        str = "";
    }
    var reg = new RegExp(/^(?![^a-zA-Z]+$)(?!\D+$)/);
    if (reg.test(str)) {
        return true;
    } else {
        $('#alert_msg').text('密码必须包含数字和字母');
        // alert('密码必须包含数字和字母');
        str = "";
    }
}

$(function() {
    // 用户名长度不能大于25
    $('#userName').blur(function() {
        let val = $('#userName').val();
        if (val.length > 25) {
            alert('用户名长度大于25, 请重新输入');
            $('#userName').val("");
        }
    });
    // 用户密码检验
    $('#userPass').blur(function() {
        let val = $('#userPass').val();
        // CheckPassWord(val);
        if (val.length > 18) {
            alert('密码长度大于18, 请重新输入');
            return false;
        }
    });
    // 两次密码是否一致
    $('#userPass2').blur(function() {
        let val1 = $('#userPass').val();
        var val2 = $('#userPass2').val();
        if (val1 != val2) {
            $('#alert_msg').text('两次密码不一致, 请重新输入');
            // alert('两次密码不一致, 请重新输入');
            $('#userPass2').val("");
        }
    });
    // 邮箱长度大于30位
    $('#userEmail').blur(function() {
        let val = $('#userEmail').val();
        if (val.length > 30) {
            alert('邮箱长度大于30, 请重新输入');
            $('#userEmail').val("");
        }
    });
    // 注册地址
    $('#userPlace').blur(function() {
        let val = $('#userPlace').val();
        if (val.length > 10) {
            alert('注册地址长度大于10, 请重新输入');
            $('#userPlace').val("");
        }
    });
});