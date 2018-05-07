//之前的上传文件使用，目前没有使用
//return the boundary value
function getContenttype(headers) {
  var type = headers['content-type'].split(';');
  if(type[0] === 'multipart/form-data') {
    var boundary = type[1].split('=');
    return boundary[1];
  }
  else {
    console.log('contenttype error');
    return 0;
  }
}

//get parameter and file data ,rewrite;
//str is received binary data encoded string .bound is boundary 
function getUploadValue(str,bound) {
  var bodyPart = str.split('--' + bound);
      //最后有个分隔符是一个数组
  var dataWrite = [];
      //file data contain '\r\n'!!!
  var fileContent = bodyPart[1].split('\r\n');
  for(let i = 4 ; i < fileContent.length - 1 ; i++) {
    dataWrite.push(fileContent[i]);//push update file content
  }     
     // console.log(dataWrite[0]);
     //the value of last index is  empty,the penult is submit button we ignore them
  for(let i = 2 ; i < bodyPart.length - 2; i++) {//push parameter
    var temparr = bodyPart[i].split('\r\n');
    var parameterName = temparr[1].split(';')[1].split('=')[1];
    var parameterValue = temparr[3];
    dataWrite.push(parameterName + ':'+ parameterValue);
  }
  var dataWriteStr = dataWrite.join(',');
  return dataWriteStr;
}

//get updated file name 
//str is received binary data encoded string .bound is boundary 
function getFilename(str,bound) {
  var bodyPart = str.split('--' + bound);
    //最后有个分隔符是一个数组
  var dataWrite = [];
    //file data contain '\r\n'!!!
  var filenameline = bodyPart[1].split('\r\n')[1];
  return filenameline.split(';')[2].split('=')[1];

}
//---------以上是处理文件和参数表单--------
//-----------以下处理表单------
//http request has body or not
var hasbody = function(req) {
  return 'transfer-encoding' in req.headers || 'content-length' in req.headers;
}






module.exports.getUploadValue = getUploadValue;
module.exports.getContenttype = getContenttype;
module.exports.getFilename = getFilename;
