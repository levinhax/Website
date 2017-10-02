$(function() {


    $("#userName").blur(function() {
        var userName = $('#userName').val();

        // 发送ajax请求，使用post方式发送json字符串给后台
        $.ajax({
            type: 'post',
            url: 'http://localhost:3000/user/checkName',
            dataType: "json",
            data: {
                userName: userName
            },
            success: function(data) {
                if (data) {
                    if (data.code == '1') {
                        alert('该用户名已被占用')
                        $('#userName').val("");
                    }
                }
            },
            error: function(res, status, e) {

            }
        });
    });


    $("#userEmail").blur(function() {
        var userEmail = $('#userEmail').val();

        // 发送ajax请求，使用post方式发送json字符串给后台
        $.ajax({
            type: 'post',
            url: 'http://localhost:3000/user/checkEmail',
            dataType: "json",
            data: {
                userEmail: userEmail
            },
            success: function(data) {
                if (data) {
                    if (data.code == '2') {
                        alert('该邮箱已被注册')
                        $('#userEmail').val("");
                    }
                }
            },
            error: function(res, status, e) {

            }
        });
    });



});