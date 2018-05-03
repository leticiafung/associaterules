/**
 * Created by leticia on 2018/3/15.
 */

function highlightP() {
    var navlist = document.getElementById("list1"),
        alink = navlist.getElementsByTagName("a"),
        currenthref = window.location.href;
    for( let i = 0 ; i < alink.length;i++){
        var linkhref = alink[i].getAttribute("href");
        if(currenthref.indexOf(linkhref)!= -1){
            alink[i].className = "here";

        }
    }
}
window.onload=function(){
    highlightP();
    draw();
};

function draw( node,edge ){
    var nodes = [ { name: "桂林" }, { name: "广州" },
        { name: "厦门" }, { name: "杭州" },
        { name: "上海" }, { name: "青岛" },
        { name: "天津" } ];

    var edges = [ { source : 0 , target: 1 } , { source : 0 , target: 2 } ,
        { source : 0 , target: 3 } , { source : 1 , target: 4 } ,
        { source : 1 , target: 5 } , { source : 1 , target: 6 } ];
    var width = 300,
        height = 300;

    var force = d3.layout.force()
        .nodes( nodes )
        .links( edges )
        .size( [width , height])
        .linkDistance( 180 )
        .charge(-1500)//顶点的电荷数。该参数决定是排斥还是吸引，数值越小越互相排斥
        .on("tick", tick)//指时间间隔，隔一段时间刷新一次画面
        .start();//开始转换

    var svg = d3.select("svg");

    var svg_edges = svg.selectAll("line")
        .data(edges)
        .enter()
        .append("line")
        .style("stroke","#ccc")
        .style("stroke-width",1);

    var color = d3.scale.category20();

    //添加节点
    var svg_nodes = svg.selectAll("circle")
        .data(nodes)
        .enter()
        .append("circle")
        .attr("r",20)
        .style("fill",function(d,i){
            return color(i);
        })
        .call(force.drag);  //使得节点能够拖动

    //添加描述节点的文字
    var svg_texts = svg.selectAll("text")
        .data(nodes)
        .enter()
        .append("text")
        .style("fill", "black")
        .attr("dx", 20)
        .attr("dy", 8)
        .text(function(d){
            return d.name;
        });

    force.on("tick", function(){ //对于每一个时间间隔
        //更新连线坐标
        svg_edges.attr("x1",function(d){ return d.source.x; })
            .attr("y1",function(d){ return d.source.y; })
            .attr("x2",function(d){ return d.target.x; })
            .attr("y2",function(d){ return d.target.y; });

        //更新节点坐标
        svg_nodes.attr("cx",function(d){ return d.x; })
            .attr("cy",function(d){ return d.y; });

        //更新文字坐标
        svg_texts.attr("x", function(d){ return d.x; })
            .attr("y", function(d){ return d.y; });
    });
}

