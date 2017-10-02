$(function() {

    $("#userEmail").blur(function() {
        var userEmail = $('#userEmail').val();
        var userPass = $('#userPass').val();

        // 发送ajax请求，使用post方式发送json字符串给后台
        $.ajax({
            type: 'post',
            url: 'http://localhost:3000/blog/login',
            dataType: "json",
            data: {
                userEmail: userEmail,
                userPass: userPass
            },
            success: function(data) {
                if (data) {
                    if (data.code == '0') {
                        // alert('邮箱不存在');
                        $('#alert_msg').text('邮箱不存在');
                        $('#userEmail').val("");
                    }
                }
            },
            error: function(res, status, e) {

            }
        });
    });


    $("#userPass").blur(function() {
        var userEmail = $('#userEmail').val();
        var userPass = $('#userPass').val();

        // 发送ajax请求，使用post方式发送json字符串给后台
        $.ajax({
            type: 'post',
            url: 'http://localhost:3000/blog/login',
            dataType: "json",
            data: {
                userEmail: userEmail,
                userPass: userPass
            },
            success: function(data) {
                if (data) {
                    if (data.code == '1') {
                        $('#alert_msg').text('密码错误');
                        $('#userPass').val("");
                    }
                }
            },
            error: function(res, status, e) {

            }
        });
    });


});