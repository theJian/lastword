// NEED TO TEST 

// day 07.12.2015 @zhe13 
// captcha
// day 08.12.2015 @zhe13
// fix port and ip

// @SAMPLE
// var ccap = require("ccap");
// var captcha1 = ccap();//use default settings
// var captcha2 = ccap(width,height,offset);//change the captcha's w,h and the offset of characters in it
// var captcha3 = ccap({
//     width:522,//default os 256
//     height:522,//default is 60
//     offset:522,//default is 40
//     quality:13,//default is 50
//     generate:function(){
//         //custom the function to generate captcha text
//         return text;
//     }//default is a 6 digit number from a-z,0-9
// });


"use strict"
var http = require("http");
var ccap = require("ccap");
var captcha = ccap();
http.createServer(function(request,response){
    response.writeHead(200, {'Content-Type': 'text/plain'});
    if(request.url == "/favicon.icon")
    return response.end("");
    let any = captcha.get();
    let txt = any[0];
    let pic_buf = any[1];
    response.end(pic_buf);
    console.log("YANZHENGMA",txt);
}).listen(process.env.PORT,process.env.IP);

console.log("Server running at http://127.0.0.1:8080/");


exports.getChecksum = function(){
    let any = captcha.get();
    let code={
        txt     : any[0],
        pic_buf : any[1]
    };
    return code;
}
