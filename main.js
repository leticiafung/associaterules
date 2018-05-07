var http = require('http'),
  fs = require('fs'),
  express = require('express'),
  iconv = require('iconv-lite'),
  readAndwrite = require('./readAndwrite');


const querystring = require('querystring');
	
var app = express();
app.set('views',__dirname +'/views');
app.set('view engine','jade');
app.use(express.static(__dirname));
http.createServer(app).listen(8888,'127.0.0.1');
console.log('服务器在8888上运行');

//响应表单提交
app.route('/answer')
  .post((req,res) => {//判断body是不是为空！！！
  console.log('返回');
  var chunks = [];
  var size = 0 ;
  req.on('data',(chunk) => {
  	
  	chunks.push(chunk);
    size += chunk.length;
  	//console.log(data.toString());
  })//receive data
 
  req.on('end',()=>{
    var content = Buffer.concat(chunks,size).toString();
    req.body = querystring.parse(content);//like {xx:aa;cc:b}
    //写算法需要的json
    req.body = readAndwrite.transferAsparameter(req.body);
  //  console.log('after:'+ JSON.stringify(req.body));
    readAndwrite.calculateData(req.body,res);
    });
  //console.log(req.body);
  });

//响应绘图
  app.get('/draw.html',(req,res) => {
  	readAndwrite.renderDrawPage(res);
  })


