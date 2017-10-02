 var format = function(time, format) {
     var t = new Date(time);
     var tf = function(i) {
         return (i < 10 ? '0' : '') + i
     };
     return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function(a) {
         switch (a) {
             case 'yyyy':
                 return tf(t.getFullYear());
                 break;
             case 'MM':
                 return tf(t.getMonth() + 1);
                 break;
             case 'mm':
                 return tf(t.getMinutes());
                 break;
             case 'dd':
                 return tf(t.getDate());
                 break;
             case 'HH':
                 return tf(t.getHours());
                 break;
             case 'ss':
                 return tf(t.getSeconds());
                 break;
         }
     });
 }

 // var format2 = function(time, format) {
 //      var t = new Date(time);
 //      var tf = function(i) {
 //          return (i < 10 ? '0' : '') + i
 //      };
 //      return format.replace(/yyyy|MM|dd/g, function(a) {
 //          switch (a) {
 //              case 'yyyy':
 //                  return tf(t.getFullYear());
 //                  break;
 //              case 'MM':
 //                  return tf(t.getMonth() + 1);
 //                  break;
 //              case 'dd':
 //                  return tf(t.getDate());
 //                  break;
 //          }
 //      });
 //  }

 window.onload = function() {
     var blogItemDate = document.getElementsByClassName('blog_date');
     var photoItemDate = document.getElementsByClassName('photo_date');
     for (var i = 0; i < blogItemDate.length; i++) {
         var blogOldTime = blogItemDate[i].innerText;
         blogItemDate[i].innerText = format(blogOldTime, "yyyy-MM-dd HH:mm:ss");
     }
     for (var i = 0; i < photoItemDate.length; i++) {
         var photoOldTime = photoItemDate[i].innerText;
         photoItemDate[i].innerText = format(photoOldTime, "yyyy-MM-dd");
     }
 }