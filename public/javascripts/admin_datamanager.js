// 日志列表
$(function() {
    $('#content_body').find('.edit').click(function() {
        $('#editArticle').show();
    });
    $('#close').click(function() {
        $('#editArticle').hide();
    });
    $('#editArticle').find('.btn_cancel').click(function() {
        $('#editArticle').hide();
    });
});

// 作品列表
// $(function() {
//     $('#content_body').find('.edit').click(function() {
//         $('#editProject').show();
//     });
//     $('#close').click(function() {
//         $('#editProject').hide();
//     });
//     $('#editProject').find('.btn_cancel').click(function() {
//         $('#editProject').hide();
//     });
// });

// 相册列表
// $(function() {
//     $('#content_body').find('.edit').click(function() {
//         $('#editPhoto').show();
//     });
//     $('#close').click(function() {
//         $('#editPhoto').hide();
//     });
//     $('#editPhoto').find('.btn_cancel').click(function() {
//         $('#editPhoto').hide();
//     });
// });