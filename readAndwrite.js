var child = require('child_process'),
	iconv = require('iconv-lite'),
	fs = require('fs');

//避免回调地狱！！！
//wrap fs.readfile with promise,read file not binary file(picture or something) 
//java 输出格式为"[{"zzz":"vvv"},{"ccc":"www"}]"
function readFile(filename) {
	return new Promise((resolve,reject)=> {
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

//wrap writeStream 极不好模块化！采用writefile wrap 
function writeFile(filename,req.body) {
	return new Promise((resolve,reject) => {
		var jsondata = JSON.stringify(req.body);
		fs.writeFile(filename,jsondata,(err) =>{
			if(err) {
				reject(err);
				return;
			}
			resolve();
		})
	})
}

//运行js后，返回结果写在out
function calculateData(resp) {
  //返回给客户端以buffer形式
  let promise1 = writeFile(__dirname + '/parameter.json');
  promise1.then(() => {
  let promise = childExec("java -jar ReadAndWrite.jar") ;
  promise.then(() => {
	  let promise2 = readFile(__dirname+'/outfile/out.txt');//要读的文件
	  promise2.then((data) => { 
          parseOutdata(data);
		  console.log(data.toString());//这里写对data的改变
	  },
	  (err) => { console.log('!readerror:'+ err);})
  },
  (processerror) => { console.log('!porcesserror:'+ processerror);});
},(err)=>{ console.log('!write error');})

//渲染关联规则页
function parseRenderdata(data,resp) {
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

//parse data to object,mount on req.body
function transferAsparameter(req.body) {
	var temp = {path:{},sql:{},data_process:{},correlation_algorithm:{},
	            association_rules:{},root_analysis:{}};
	var count = 0 ;
	for(var i in req.body) {
        if(count < 2 && count >= 0)
			temp['path'][i] = req.body[i];
		else if(count >= 2 && count < 20)
			temp['sql'][i] = req.body[i];
		else if(count >= 20 && count < 25)
			temp['data_process'][i] = req.body[i];
		else if(count >= 25 && count < 27)
			temp['correlation_algorithm'][i] = req.body[i];
		else if(count >= 27 && count < 32)
			temp['association_rules'][i] = req.body[i];
		else
			temp['root_analysis'][i] = req.body[i];
		count++;
	}
	req.body = temp ;

}






module.exports.calculateData = calculateData;