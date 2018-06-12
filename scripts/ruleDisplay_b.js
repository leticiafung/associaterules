/**
 * Created by leticia on 2018/5/28.
 */
$(window).on('load' ,()=> {
    // let bt = $("#showgraph"),
    //     loadbtn = $("#loadbtn");
    $("#showgraph").click(() => {
        window.open("http://127.0.0.1:8899/draw.html","_self");
    });
    $('a:eq(0)').click(()=>{
        window.history.go(-1);
    });
    $('a:eq(2)').click(()=>{
        window.history.go(1);
    });
    // $("#loadbtn").click(() => {
    //     ("/loadRule", () => {
    //         alert("下载成功！");
    //     })
    // });
    // let button = $('#btn');
    let flag = true;//0升序，1降序
    $('#btn').click((event) => {
        let k = event.target.innerText;
        console.log(k);
        sort(k, flag);
        flag = !flag;
    })
});

// js version
// function sort(type,order) {
//     var arr = [],
//         list = $('#list'),
//         rows = $('#list').rows,//jquery 没有rows!!1
//         // rows = $('#list').children("tr"),
//         temp = '',
//         key;
//     //temp ="<tr id = 'btn'><th>id</th><th>price</th><th>sale</th></tr>";
//
//     //console.log(rows);
//     for (let i = 0; i < rows.length; i++) {
//         arr[i] = rows[i];
//         console.log(arr[i].innerHTML);
//     }
//     //console.log(arr);
//     if (type === 'xSupport')
//         key = 2;
//     else if (type === 'ySupport')
//         key = 5;
//     else if (type === 'xySupport') {
//         key = 6;
//     }
//     else if (type === 'confidence') {
//         key = 7;
//     }
//     else
//         key = -1;
//     if (key !== -1) {
//         if (order === true) {
//             arr.sort((a, b) => {
//                 return Number(a.cells[key].innerText) - Number(b.cells[key].innerText);
//                 //return Number($(a).children('td').eq(key).innerText) - Number($(b).children('td').eq(key).innerText);
//             });
//         }
//         else {
//             arr.sort((a, b) => {
//              return Number(b.cells[key].innerText) - Number(a.cells[key].innerText);
//                 //return Number($(b).children('td').eq(key).innerText) - Number($(a).children('td').eq(key).innerText);
//             });
//         }
//         // console.log(arr[0].innerHTML);
//         // console.log(arr[1].innerHTML);
//         // console.log(arr[2].innerHTML);
//
//         for (let i = 0; i < arr.length; i++) {
//             temp += '<tr>';
//             temp += arr[i].innerHTML;
//             temp += '</tr>';
//         }
//         list.innerHTML = temp;
//     }
// }
//jquery version
function sort(type,order) {
    let arr = [],
        list = $('#list'),
        rows = $('#list').children("tr"),
        key;
    rows = Array.prototype.slice.call(rows,0);
    if (type === 'xSupport')
        key = 3;
    else if (type === 'ySupport')
        key = 7;
    else if (type === 'xySupport') {
        key = 8;
    }
    else if (type === 'confidence') {
        key = 9;
    }
    else
        key = -1;
    if (key !== -1) {
        if (order === true) {
            rows.sort((a, b) => {
                return Number($(a).children('td').eq(key).text()) - Number($(b).children('td').eq(key).text());
            });
        }
        else {
            rows.sort((a, b) => {
                return Number($(b).children('td').eq(key).text()) - Number($(a).children('td').eq(key).text());
            });
        }
    }
    list.append(rows);
}





