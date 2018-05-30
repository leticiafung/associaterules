/**
 * Created by leticia on 2018/5/22.
 */
// function highlightP() {
//     var navlist = document.getElementById("list1"),
//         alink = navlist.getElementsByTagName("a"),
//         currenthref = window.location.href;
//     for( let i = 0 ; i < alink.length;i++){
//         var linkhref = alink[i].getAttribute("href");
//         if(currenthref.indexOf(linkhref)!= -1){
//             alink[i].className = "here";

//         }
//     }
// }
// window.onload=function(){
//     highlightP();
//     let displayBtn = $()
//    // draw();
// };
//let links = JSON.parse(document.getElementsByClassName('hiddenv')[0].innerText);
let links = [],
    nodes = {};

 $( window ).on('load',()=>{
     let k = -3;
     $("#ruleDisplay").click((event)=>{
         // let z = event.target;
         // console.log(z);
         //箭头函数调用第一个非对象的this
         $("#svgplace").empty();
         console.log($(event.target).parent());
         k = $("#ruleDisplay").children($("button")).index($(event.target));
         console.log(k);
         getLinks(k);
         draw();
         drawForce();

     })
     $('a:eq(0)').click(()=>{
         window.history.go(-2);
     });
     $('a.eq(1)').click(()=>{
         window.history.go(-1);
     });
});

    // var links =  [{"src_id":"25888","src_name":"SCTP链路故障告警","des_id":"29201",
    //    "des_name":"S1接口故障告警","count":"220","weight":"0.9482758620689655"}];
    //var links = JSON.parse(document.getElementsById('hiddenv').innerText);
function getLinks(k) {
    if(k !== -1) {
        links = JSON.parse($(".hiddenv").eq(k).text());
        nodes = {};
    }
}

function draw() {
    links.forEach(function (link) {
        // link.source = nodes[link.src_name] || (nodes[link.src_name] = {name: link.src_name});
        // link.target = nodes[link.des_name] || (nodes[link.des_name] = {name: link.des_name});
        link.source = nodes[link.xName] || (nodes[link.xName] = {name: link.xName});
        link.target = nodes[link.yName] || (nodes[link.yName] = {name: link.yName});

    });
}
//draw();
function drawForce() {
    //d3.select("#")getElementById("div").offsetWidth;
    let width = 1200,
        height = 800;
    console.log(nodes);
    var force = d3.layout.force()//layout将json格式转化为力学图可用的格式
        .nodes(d3.values(nodes))//设定节点数组
        .links(links)//设定连线数组
        .size([width, height])//作用域的大小
        .linkDistance(180)//连接线长度
        .charge(-1500)//顶点的电荷数。该参数决定是排斥还是吸引，数值越小越互相排斥
        .on("tick", tick)//指时间间隔，隔一段时间刷新一次画面
        .start();//开始转换
//console.log(nodes);
//var svg = d3.select("body").append("svg")


    var svg = d3.select("#svgplace").append("svg",".col-md-10",".col-lg-10")
        .attr("width", width)
        .attr("height", height);

//箭头
    var marker =
        svg.append("marker")
        //.attr("id", function(d) { return d; })
            .attr("id", "resolved")
            //.attr("markerUnits","strokeWidth")//设置为strokeWidth箭头会随着线的粗细发生变化
            .attr("markerUnits", "userSpaceOnUse")
            .attr("viewBox", "0 -5 10 10")//坐标系的区域
            .attr("refX", 32)//箭头坐标
            .attr("refY", -1)
            .attr("markerWidth", 12)//标识的大小
            .attr("markerHeight", 12)
            .attr("orient", "auto")//绘制方向，可设定为：auto（自动确认方向）和 角度值
            .attr("stroke-width", 2)//箭头宽度
            .append("path")
            .attr("d", "M0,-5L10,0L0,5")//箭头的路径
            .attr('fill', '#000000');//箭头颜色


//设置连接线
    var edges_line = svg.selectAll(".edgepath")
        .data(force.links())
        .enter()
        .append("path")
        .attr({
            'd': function (d) {
                return 'M ' + d.source.x + ' ' + d.source.y + ' L ' + d.target.x + ' ' + d.target.y
            },
            'class': 'edgepath',
            //'fill-opacity':0,
            //'stroke-opacity':0,
            //'fill':'blue',
            //'stroke':'red',
            'id': function (d, i) {
                return 'edgepath' + i;
            }
        })
        .style("stroke", function (d) {
            var lineColor;
            lineColor = '#B43232';
            return lineColor;
        })
        .style("pointer-events", "none")
        .style("stroke-width", 0.5)//线条粗细
        .attr("marker-end", "url(#resolved)");//根据箭头标记的id号标记箭头

    var edges_text = svg.append("g").selectAll(".edgelabel")
        .data(force.links())
        .enter()
        .append("text")
        .style("pointer-events", "none")
        //.attr("class","linetext")
        .attr({
            'class': 'edgelabel',
            'id': function (d, i) {
                return 'edgepath' + i;
            },
            'dx': 80,
            'dy': 0
            //'font-size':10,
            //'fill':'#aaa'
        });

//设置线条上的文字
    edges_text.append('textPath')
        .attr('xlink:href', function (d, i) {
            return '#edgepath' + i
        })
        .style("pointer-events", "none")
        .text(function (d) {
            return d.confidence.toFixed(3);
        });
//changehere
// .text(function(d){return d.weight;});

//圆圈
    var circle = svg.append("g").selectAll("circle")
        .data(force.nodes())//表示使用force.nodes数据
        .enter().append("circle")
        .style("fill", function (node) {
            var color;//圆圈背景色
            var link = links[node.index];
            color = "#F9EBF9";
            return color;
        })
        .style('stroke', function (node) {
            var color;//圆圈线条的颜色
            var link = links[node.index];
            // if(node.name==link.source.name && link.rela=="主营产品"){
            //     color="#B43232";
            // }else{
            color = "#A254A2";
            // }
            return color;
        })
        .attr("r", 28)//设置圆圈半径
        .on("click", function (node) {
            //单击时让连接线加粗
            edges_line.style("stroke-width", function (line) {
                console.log(line);
                if (line.source.name == node.name || line.target.name == node.name) {
                    return 4;
                } else {
                    return 0.5;
                }
            });
            //d3.select(this).style('stroke-width',2);
        })
        .call(force.drag);//将当前选中的元素传到drag函数中，使顶点可以被拖动

    var text = svg.append("g").selectAll("text")
        .data(force.nodes())
        //返回缺失元素的占位对象（placeholder），指向绑定的数据中比选定元素集多出的一部分元素。
        .enter()
        .append("text")
        .attr("dy", ".35em")
        .attr("text-anchor", "middle")//在圆圈中加上数据
        .style('fill', function (node) {
            var color;//文字颜色
            var link = links[node.index];
            // if(node.name==link.source.name && link.rela=="主营产品"){
            //     color="#B43232";
            // }else{
            color = "#A254A2";
            //}
            return color;
        }).attr('x', function (d) {
            // console.log(d.name+"---"+ d.name.length);
            var re_en = /[a-zA-Z]+/g;
            //如果是全英文，不换行
            if (d.name.match(re_en)) {
                d3.select(this).append('tspan')
                    .attr('x', 0)
                    .attr('y', 2)
                    .text(function () {
                        return d.name;
                    });
            }
            //如果小于四个字符，不换行
            else if (d.name.length <= 4) {
                d3.select(this).append('tspan')
                    .attr('x', 0)
                    .attr('y', 2)
                    .text(function () {
                        return d.name;
                    });
            } else {
                var top = d.name.substring(0, 4);
                var bot = d.name.substring(4, d.name.length);

                d3.select(this).text(function () {
                    return '';
                });

                d3.select(this).append('tspan')
                    .attr('x', 0)
                    .attr('y', -7)
                    .text(function () {
                        return top;
                    });

                d3.select(this).append('tspan')
                    .attr('x', 0)
                    .attr('y', 10)
                    .text(function () {
                        return bot;
                    });
            }
            //直接显示文字
            /*.text(function(d) {
             return d.name; */
        });

    function tick() {
        circle.attr("transform", transform1);//圆圈
        text.attr("transform", transform2);//顶点文字

        edges_line.attr('d', function (d) {
            var path = 'M ' + d.source.x + ' ' + d.source.y + ' L ' + d.target.x + ' ' + d.target.y;
            return path;
        });

        edges_text.attr('transform', function (d, i) {
            if (d.target.x < d.source.x) {
                bbox = this.getBBox();
                rx = bbox.x + bbox.width / 2;
                ry = bbox.y + bbox.height / 2;
                return 'rotate(180 ' + rx + ' ' + ry + ')';
            }
            else {
                return 'rotate(0)';
            }
        });
    }

//设置圆圈和文字的坐标
    function transform1(d) {
        return "translate(" + d.x + "," + d.y + ")";
    }

    function transform2(d) {
        return "translate(" + (d.x) + "," + d.y + ")";
    }
}

