/**
 * Created by leticia on 2018/3/13.
 */
//最后整理一下浏览器兼容！！
window.onload = function() {
    var uplist = document.getElementById("row41");
    uplist.addEventListener("click",foldunfold,false);
    highlightP();

   // var form = document.getElementById("upload");
    //form.addEventListener("submit", formSubmit, false);



};
function foldunfold() {
    var icon = document.getElementById("ficon"),
        cont = document.getElementById("row42");

    if(cont.style.visibility =="hidden") {
        icon.setAttribute("src", "images/show.png");
        cont.style.visibility = "visible";
        console.log(cont.style.display);
    }
    else{
        icon.setAttribute("src", "images/unshow.png");
        cont.style.visibility = "hidden";
        console.log(cont.style.display);

    }

}
//highlight the page
function highlightP() {
        var navlist = document.getElementById("list1"),
            alink = navlist.getElementsByTagName("a"),
            currenthref = window.location.href;
        for( let i = 0 ; i < alink.length;i++) {
            var linkhref = alink[i].getAttribute("href");
            if (currenthref.indexOf(linkhref)!= -1) {
                alink[i].className = "here";
            }
        }
}

function formSubmit(event) {
    event.preventDefault();
    var form = document.getElementById("upload");
    
    var uploadfilepath = document.getElementById("doc1");
    console.log(uploadfilepath.value);//the file path
    
    form.elements["filepath"].value = uploadfilepath.value;
   // alert(uploadfilepath.files.length);
    form.submit();
}

//http.request()

