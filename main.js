var http = require('http'),
  fs = require('fs'),
  express = require('express'),
  iconv = require('iconv-lite'),
  calcu = require('./readAndwrite'),
  parsePort = require('./parsePost');
	
var app = express();
app.set('views',__dirname +'/views');
app.set('view engine','jade');
app.use(express.static(__dirname));
http.createServer(app).listen(8888,'127.0.0.1');
console.log('服务器在8888上运行');

app.route('/answer')
  .post((req,res) => {//判断body是不是为空！！！
  console.log('返回');
  var chunks = [];
  var size = 0 ;
  req.on('data',(chunk) => {
  	
  	chunks.push(chunk);
    size += chunk.length;
  	//console.log(data.toString());
  })
 
  
  req.on('end',()=>{
    var content = Buffer.concat(chunks,size);
    var str = iconv.decode(content,'UTF-8');
    var bound = parsePort.getContenttype(req.headers);
     
  //console.log(__dirname + filepath );how to get creatfilename
   
   
    var writeStrea = fs.createWriteStream(__dirname + '/in.txt' );
    if(bound !== 0) {  
      //最后有个分隔符是一个数组,不把提交按钮写入文件中
      var dataWriteStr = parsePort.getUploadValue(str,bound);
      var dataWriteBuffer = iconv.encode(dataWriteStr,'UTF-8');
      writeStrea.write(dataWriteBuffer);
      // writeStrea.write('\r\n');
      // writeStrea.write(content);
      writeStrea.end();
       
      }
    
    writeStrea.on('close',()=>{calcu.calculateData(res);});
    
    // res.writeHead(200,{'Content-Type':'text/plain'});
    // res.write(req.headers['content-type']);
    // res.end('nothing');
    });
  //console.log(req.body);
   });


