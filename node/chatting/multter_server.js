// day 12.9.2015 @zhe13
//      learning from theJian,use express instead of the native http/net to buila a chatroom
//      and it helps me to understand the server.js and router.js
// day 12.10.2015 @zhe13
//      transport from express 3.x to 4.x

// note :I DONT THINK ITs a good choic

var express = require("express");
var body_parser = require("body-parser");
var application = express();
// improving listen will not do matter with the process.Need to keep notes here.
application.listen(process.env.PORT,process.env.IP);

var msgs = new Array();

application.get('/',function(req,res){
    res.send("Welcome to multter,User")
});

// express no longer provides so many middleware,need to install it separately.
application.post('/send',body_parser.urlencoded({extended:true}),function(req,res){
    if(req.body && req.body.msg){
        msgs.push(req.body.msg);
        res.send({status:"OK",message:"received successfully"});
    }else{
        console.log(req);
        res.send({status:"WARNING",message:"received failed"});
    }
});

application.get('/multter',function(req, res) {
    res.send(msgs);
})

