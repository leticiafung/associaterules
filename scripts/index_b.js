/**
 * Created by leticia on 2018/6/12.
 */
window.onload = function() {
    $('#row41').click(foldunfold);
    $('#subbtn').click(()=>{
        $('#mask').css('display','block');
    });
    $('#subdata').click(()=>{
        alertTime();
        //setlocalStorage();
        let data = $('#upload').serialize();
        $.ajax({
            type:'post',
            url:'/readData',
            data: data,
            success:function(data){
                $('#mask').css('display','none');
                alert(data);
            },
            error:function(){
                alert('读取失败！');
                $('#mask').css('display','none');
            }
        })
    });
    $('a:eq(1)').click(()=>{
        window.history.go(1);
    });
    $('a:eq(2)').click(()=>{
        window.history.go(2);
    });

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
    var mask = document.getElementById("mask");
    mask.style.display = 'block';
}

function setlocalStorage(){
    console.log('yes');
    if(localStorage !== "object"){
        console.log('no');
        return;
    }
    let Storage = localStorage;
    let inputs = $('#requiredRow').find('input');

    console.log(inputs);
    for(let i = 0 ,len = inputs.length; i < len ;i++ ){
        let input = input[i];
        console.log(input.prop('name') + ':'+input.val());
        Storage.setItem(input.prop('name'),input.val());
    }
}

