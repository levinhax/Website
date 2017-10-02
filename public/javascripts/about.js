window.onload = function() {
    var resumeItem = document.getElementsByClassName("resume_item");
    var itemContent = document.getElementsByClassName("item_content");

    for (var i = 0; i < resumeItem.length; i++) {
        resumeItem[i].index = i;
        resumeItem[i].onclick = function() {

            if (itemContent[this.index].style.display == "block") {
                itemContent[this.index].style.display = "none";
            } else {
                itemContent[this.index].style.display = "block";
            }
        }
    }

}