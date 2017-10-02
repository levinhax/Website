// 删除文章

$(function() {
    let userName = $('#userName').text();
    let photoAuthor = $('#photoAuthor').text();

    if (userName != 'admin') {
        if (userName != photoAuthor) {
            $('.delete').click(function() {
                alert('你没有删除的权限');
                return false;
            });
        }
    }
});

$(function() {
    $('body').on("click", '.delete', function(e) {
        let id = $(this).attr('data-id'),
            that = this;
        if (confirm('确定删除该相册?')) {
            $.ajax({
                type: 'get',
                url: '/admin/delPhoto?id=' + id,
                success: function() {
                    alert('相册已删除');
                    // res.redirect('/admin/article');
                    $(that).parent().parent().fadeOut();
                }
            });
        } else {
            return false;
        }
    });
});

// 获取url中"?"符后的字串
function GetRequest() {
    var url = location.search; //获取url中"?"符后的字串
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}

//分页功能
$(function() {
    $('body').on("click", '.page', function(e) {
        let id = $(this).attr('data-id'),
            url = '/admin/photo?page=' + id;

        $.ajax({
            type: 'get',
            url: '/admin/photo?page=' + id,
            success: function(result) {
                $(location).attr('href', url);

                // $('that').addClass('cur');
            }
        });

    });
});

// 跳转
$(function() {
    $('body').on("click", '#pageToBtn', function(e) {
        let id = $('#pageVal').val(),
            url = '/admin/photo?page=' + id;

        $.ajax({
            type: 'get',
            url: '/admin/photo?page=' + id,
            success: function(result) {
                $(location).attr('href', url);
            }
        });

    });
});

// 添加类,待补充
// $(function() {
//     function GetRequest() {
//         var url = location.search; //获取url中"?"符后的字串
//         var theRequest = new Object();
//         if (url.indexOf("?") != -1) {
//             var str = url.substr(1);
//             strs = str.split("&");
//             for (var i = 0; i < strs.length; i++) {
//                 theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
//             }
//         }
//         return theRequest;
//     }

//     var Request = GetRequest();
//     var pageId = Request['page'];

//     if (typeof(pageId) === 'undefined') {
//         pageId = 1;
//     }


// });

// 上一页
$(function() {
    $('body').on("click", '.pre_page', function(e) {

        let Request = GetRequest();
        var pageId = Request['page'];
        if (isNaN(pageId)) {
            pageId = 1;
        }

        let id = pageId - 1;
        if (id <= 1) {
            id = 1;
        }
        let url = '/admin/photo?page=' + id;


        $.ajax({
            type: 'get',
            url: '/admin/photo?page=' + id,
            success: function(result) {
                $(location).attr('href', url);

                // $('that').addClass('cur');
            }
        });

    });
});

// 下一页
$(function() {
    $('body').on("click", '.next_page', function(e) {

        let Request = GetRequest();
        var pageId = Request['page'];

        if (isNaN(pageId)) {
            pageId = 1;
        }

        let pageCount = $('.pageCount').text();
        let id = parseInt(pageId) + 1;
        if (id >= pageCount) {
            id = pageCount;
        }


        let url = '/admin/photo?page=' + id;


        $.ajax({
            type: 'get',
            url: '/admin/photo?page=' + id,
            success: function(result) {
                $(location).attr('href', url);

                // $('that').addClass('cur');
            }
        });

    });
});