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
function writeFile(filename, reqbody) {
	return new Promise((resolve,reject) => {
		var jsondata = JSON.stringify(reqbody);
		console.log('jsondata:'+ jsondata);
		fs.writeFile(filename,jsondata,(err) =>{
			if(err) {
				reject(err);
				return;
			}
			resolve();
		})
	})
}


function calculateData(reqbody,resp) {
  //返回给客户端以buffer形式,关联规则分析页的返回
  let promise1 = writeFile(__dirname + '/parameter.json',reqbody);
  promise1.then(()=>{
  	console.log('writesuccessful');
  	let promise = childExec("java -jar ReadAndWrite.jar"); 
  	return promise;
  },(writeerr)=>{ console.log('!write error');
     return;
  }).then(()=> {	  
  	let promise2 = readFile(__dirname+'/views/ruleDisplay.json');
  	console.log('execsuccessful');
  	return promise2;
  },(processerror) => { console.log('!porcesserror:'+ processerror);
    return;
  }).then((data) => {
  	console.log('readsuccessful');
  	console.log(data);
	parseRenderdata(data,resp);
  },(readerr) => { console.log('!readerror:'+ err);
    return ;
  });

//渲染关联规则页,发送响应,内部函数
function parseRenderdata(data,resp) {
	resp.writeHead(200,{'Content-Type':'text/html'});
	resp.render('ruleDisplay.jade', JSON.parse(data),(err,html)=>{
		if(err) {
			console.log('渲染出错');
			throw err;
			return;
		}
		else {
			resp.write(html);
		}
		resp.end();
	});
  }
}

//parse data to object,mount on req.body
function transferAsparameter(reqbody) {
	var temp = {'path':{},'sql':{},'data_process':{},'correlation_algorithm':{},
	            'association_rules':{},'root_analysis':{}};
	var count = 0 ;
	for(var i in reqbody) {
        if(count < 2 && count >= 0)
			temp['path'][i] = reqbody[i];
		else if(count >= 2 && count < 20)
			temp['sql'][i] = reqbody[i];
		else if(count >= 20 && count < 25)
			temp['data_process'][i] = reqbody[i];
		else if(count >= 25 && count < 27)
		{
			if(count == 25)
				temp['correlation_algorithm']['support'] = reqbody[i];
			else
				temp['correlation_algorithm'][i] = reqbody[i];
		}
		else if(count >= 27 && count < 32)
			temp['association_rules'][i] = reqbody[i];
		else
			temp['root_analysis'][i] = reqbody[i];
		count++;
	}
	return temp ;
	console.log('reqpath:' + JSON.stringify(temp));

}

//handle the draw page 
function renderDrawPage(res) {
	let promise = readFile(__dirname+'/views/draw.json');
	promise.then((data) => {
		res.writeHead(200,{'Content-Type':'text/html'});
		res.render('draw.jade', JSON.parse(data),(err,html)=>{
		if(err) {
			console.log('渲染出错');
			throw err;
			return;
		}
		else {
			res.write(html);
		}
		res.end();
	},(err) => {console.log('rendererror:' + err);return;});   

	});
}






module.exports.calculateData = calculateData;
module.exports.transferAsparameter = transferAsparameter;
module.exports.renderDrawPage = renderDrawPage;