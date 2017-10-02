window.onload = function() {
    var project = document.getElementById('project');
    var btns = project.getElementsByClassName('btns')[0];
    var btn = btns.getElementsByClassName('btn');
    var projectContent = project.getElementsByClassName('project_content')[0];
    var projectItem = projectContent.getElementsByClassName("item");



    (btn[0].onclick = function() {
        for (var i = 0; i < projectItem.length; i++) {
            projectItem[i].style.display = "inline-block";
        }
    })();


    btn[1].onclick = function() {

        var itemWebsite = getByClass(projectContent, "item_website");
        for (var i = 0; i < projectItem.length; i++) {
            if (projectItem[i].style.display == 'inline-block') {
                projectItem[i].style.display = 'none';
            }
        }
        for (var i = 0; i < itemWebsite.length; i++) {
            itemWebsite[i].style.display = "inline-block";
        }
    }

    btn[2].onclick = function() {

        var itemReact = getByClass(projectContent, "item_react");
        for (var i = 0; i < projectItem.length; i++) {
            if (projectItem[i].style.display == 'inline-block') {
                projectItem[i].style.display = 'none';
            }
        }
        for (var i = 0; i < itemReact.length; i++) {
            itemReact[i].style.display = "inline-block";
        }
    }

    btn[3].onclick = function() {
        var itemNode = getByClass(projectContent, "item_node");
        for (var i = 0; i < projectItem.length; i++) {
            if (projectItem[i].style.display == 'inline-block') {
                projectItem[i].style.display = 'none';
            }
        }
        for (var i = 0; i < itemNode.length; i++) {
            itemNode[i].style.display = "inline-block";
        }
    }

    btn[4].onclick = function() {
        var itemPython = getByClass(projectContent, "item_python");
        for (var i = 0; i < projectItem.length; i++) {
            if (projectItem[i].style.display == 'inline-block') {
                projectItem[i].style.display = 'none';
            }
        }
        for (var i = 0; i < itemPython.length; i++) {
            itemPython[i].style.display = "inline-block";
        }
    }

    btn[5].onclick = function() {
        var itemOther = getByClass(projectContent, "item_other");
        for (var i = 0; i < projectItem.length; i++) {
            if (projectItem[i].style.display == 'inline-block') {
                projectItem[i].style.display = 'none';
            }
        }
        for (var i = 0; i < itemOther.length; i++) {
            itemOther[i].style.display = "inline-block";
        }
    }



    function getByClass(oParent, sClass) {
        var aResult = [];
        var aEle = oParent.getElementsByTagName('*');

        for (var i = 0; i < aEle.length; i++) {
            /*将每个className拆分*/
            var arr = aEle[i].className.split(/\s+/);
            for (var j = 0; j < arr.length; j++) {
                /*判断拆分后的数组中有没有满足的class*/
                if (arr[j] == sClass) {
                    aResult.push(aEle[i]);
                }
            }
        }
        return aResult;
    }

}