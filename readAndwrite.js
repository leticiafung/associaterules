var child = require('child_process'),
	iconv = require('iconv-lite')
	data = 'lrm "zjzj',
	fs = require('fs');

// try {
// 	fs.appendFileSync('in.txt',data);
// } catch(err) {
// 	console.log('写错误');
// 	return;
// };

//避免回调地狱！！！
//wrap fs.readfile with promise,read file not binary file(picture or something) 
//java 输出格式为"[{"zzz":"vvv"},{"ccc":"www"}]"
function readFile(filename) {
	return new Promise((resolve,reject)=> {
		// var readStream = fs.createReadStream(filename,{
		// 	flags:'r',
		// 	encoding:'utf-8',

		// });
		// var chunks = [],
		// 	size = 0;

		// readStream.on('open',(fd) => {
		// 	console.log('file opened');
		// });
		// readStream.on('data',(chunk) => {
  // 	    	chunks.push(chunk);
  //       	size += chunk.length;
  // 	//console.log(data.toString());
  //       });
		// readStream.on('error',(err) => { reject(err);});
		// readStream.on('end',() => {
		// 	var content = Buffer.concat(chunks,size);
  //          // var jsoncontent = JSON.stringify(content);//是什么
  //           resolve(content);
		// })

		fs.readFile(filename,'utf-8',(err,data)=> {
			if(err) { 
				reject(err);
				return ;
			}
			resolve(data);
		});

	});
}
//wrap childexec with promise 
function childExec(exeCommand) {
	return new Promise((resolve,reject)=> {
		child.exec(exeCommand,(error,stdout,stderr)=> {
			if(error) {
				reject(error);
				return ;
			}
			resolve();
		})

	});
}

//运行js后，返回结果写在out
function calculateData(resp) {
  //返回给客户端以buffer形式
  let promise = childExec("java -jar ReadAndWrite.jar") ;
  promise.then(()=> {
  	  var  a = new Date().getDay();
	  let promise2 = readFile(__dirname+'/outfile/out.txt');
	  promise2.then((data) => { 
          parseOutdata(data);
		  console.log(data.toString());//这里写对data的改变
	  },(err) => { console.log('!readerror:'+ err);})
  },(processerror) => { console.log('!porcesserror:'+ processerror);});

  
function parseOutdata(data,resp) {
  	var pros = readFile(__dirname + '/drawpic.html');
  	pros.then((htmldata) => {
  		resp.writeHead(200,{'Content-Type':'text/html'});
    	//resp.write(htmldata);
        resp.render('ruleDisplay.jade',{"items":[{"a":"我是","b":"sheme","c":"nothing"},{"a":"我s是","b":"shseme","c":"notshing"},{"a":"我q是","b":"shemea","c":"nothinga"}]},(err,html)=>{
        	if(err) {
        		console.log('渲染出错');}
        	else {
        		resp.write(html);
        	}
        	});
   		resp.end();
  	})
  //	respData(resp);});
	
  }

}

// function parseOutdata(data,resp) {
//   	var pros = readFile(__dirname + '/drawpic.html');
//   	pros.then((htmldata) => {
//   		resp.writeHead(200,{'Content-Type':'text/html'});
//     	//resp.write(htmldata);
//         resp.render('ruleDisplay.jade',{"items":[{"a":"我是","b":"sheme","c":"nothing"},{"a":"我s是","b":"shseme","c":"notshing"},{"a":"我q是","b":"shemea","c":"nothinga"}]},(err,html)=>{
//         	if(err) {
//         		console.log('渲染出错');}
//         	else {
//         		resp.write(html);
//         	}
//         	});
//    		resp.end();
//   	})
//   //	respData(resp);});
	
//   }

// function respData(resp) {
// 	 resp.render('ruleDisplay.jade',{"items":[{"a":"我是","b":"sheme","c":"nothing"},{"a":"我s是","b":"shseme","c":"notshing"},{"a":"我q是","b":"shemea","c":"nothinga"}]},(err,html) => {
//         if(err) {
//         	console.log('渲染出错');
//         }
//         else {
//         	resp.write(html);
//         }
//         });
//    	resp.end();
// }

module.exports.calculateData = calculateData;