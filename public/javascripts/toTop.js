var timer = null,
    isTop = true, //是否回到顶部
    scrollTop = 0,
    toTop = document.getElementById('totop');

// 回到顶部
toTop.onclick = function() {
    clearInterval(timer);
    scrollTop = getScrollTop();
    if (scrollTop > 0) {
        timer = setInterval(function() {
            isTop = true;
            scrollTop -= Math.ceil(scrollTop / 6);
            if (scrollTop <= 0) {
                scrollTop = 0;
                clearInterval(timer);
            }
            setScrollTop(scrollTop);
        }, 30);
    }
}

// 滚动过程中停止
window.onscroll = function() {
    if (!isTop) {
        clearInterval(timer);
    }
    isTop = false;
    scrollTop = getScrollTop();
    // if (scrollTop > document.documentElement.clientHeight) {
    //     toTop.style.display = 'block';
    // } else {
    //     toTop.style.display = 'none';
    // }
}

// 获取滚动条的数值
function getScrollTop() {
    return document.documentElement.scrollTop || document.body.scrollTop;
}

function setScrollTop(scrollTop) {
    document.documentElement.scrollTop = document.body.scrollTop = scrollTop;
}


// 除了scrollTop,还有scrollTo(),scrollBy(),scrollIntoView()的实现方式