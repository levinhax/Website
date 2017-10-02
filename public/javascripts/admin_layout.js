$(function() {
    $('.nav_list').click(function(e) {
        $(this).find('.glyphicon-menu-down').toggleClass('hidden');
        $(this).find('.glyphicon-menu-up').toggleClass('hidden');
    });
});