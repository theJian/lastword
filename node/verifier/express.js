// day 07.12.2015 @zhe13 
// captcha

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
    if(request.url == "/favicon.icon")
    return response.end("");
    let any = captcha.get();
    let txt = any[0];
    let pic_buf = any[1];
    response.end(buf);
    console.log(txt)
}).listen($PORT);

console.log("Server running at http://127.0.0.1:9522/");
