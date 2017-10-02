function addListener(elem, type, callback) {
    if (elem.addEventListener) {
        elem.addEventListener(type, callback);
    } else if (elem.attachEvent) {
        elem.attachEvent('on' + type, callback);
    }
}

addListener(document, 'DOMContentLoaded', function() {
    var menuButton = document.getElementById('menu-button');
    var menuList = document.getElementById('menu-list');
    var menuLists = menuList.getElementsByTagName('li');

    addListener(menuButton, 'click', function() {
        menuList.classList.toggle("hidden");
    });

    for (var i = 0; i < menuLists.length; i++) {
        addListener(menuLists[i], 'click', function() {
            for (var j = 0; j < menuLists.length; j++) {
                menuLists[j].className = "";
            }
            this.className = "active";
        });
    }

    addListener(window, 'resize', function() {
        var width = window.innerWidth ||
            document.documentElement.clientWidth ||
            document.body.clientWidth;
        if (width > 750) {
            menuList.classList.remove("hidden");
        } else {
            menuList.classList.add("hidden");
        }
    });


});