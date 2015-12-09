// day 12.9.2015 @zhe13
//      this is a test client for post api
"use strict"
var http = require("http");
var assert = require("assert");

var option = {
    host : process.env.IP,
    port : process.env.PORT,
    path : "/send",
    method :"POST",
    headers:{"content-type":"application/x-www-form-urlencoded"}
};

var req = http.request(option,function(res){
    res.setEncoding("utf-8");
    
    let data="";
    res.on("data",function(d){
        data += d;
    });
    res.on("end",function() {
        assert.strictEqual(data,'{"status":"OK","message":"msgs received"}');
    });
    
});

req.write("msgs = test","utf-8");
req.end();