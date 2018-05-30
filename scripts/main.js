/**
 * Created by leticia on 2018/3/13.
 */
//最后整理一下浏览器兼容！！
window.onload = function() {
    let uplist = document.getElementById("row41");
    uplist.addEventListener("click",foldunfold,false);
    let btn = document.getElementById('subbtn');
    btn.onclick = function(){
        // console.log(zhe);
        var mask = document.getElementById("mask");
        mask.style.display = 'block';
    };

   // highlightP();

   // var form = document.getElementById("upload");
    //form.addEventListener("submit", formSubmit, false);

};
function foldunfold() {
    var icon = document.getElementById("ficon"),
        cont = document.getElementById("row42");

    //if(cont.style.visibility ==="hidden") {
    if(cont.style.display === "none"){
        icon.setAttribute("src", "images/show1.png");
        //cont.style.visibility = "visible";
        cont.style.display ="block";
        console.log(cont.style.display);
    }
    else{
        icon.setAttribute("src", "images/unshow1.png");
        //cont.style.visibility = "hidden";
        cont.style.display ="none";
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

function alertTime(){
    console.log(zhe);
 var mask = document.getElementById("mask");
 mask.style.display = 'block';
}

