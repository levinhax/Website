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
            url = '/photo?page=' + id;

        $.ajax({
            type: 'get',
            url: '/photo?page=' + id,
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
            url = 'photo?page=' + id;

        $.ajax({
            type: 'get',
            url: 'photo?page=' + id,
            success: function(result) {
                $(location).attr('href', url);
            }
        });

    });
});


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
        let url = 'photo?page=' + id;


        $.ajax({
            type: 'get',
            url: 'photo?page=' + id,
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


        let url = 'photo?page=' + id;


        $.ajax({
            type: 'get',
            url: 'photo?page=' + id,
            success: function(result) {
                $(location).attr('href', url);

                // $('that').addClass('cur');
            }
        });

    });
});