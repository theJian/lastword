// day 12.9.2015 @zhe13
//      learning from theJian,use express instead of the native http/net to buila a chatroom
//      and it helps me to understand the server.js and router.js
// 
// 

// note :I DONT THINK ITs a good choic

var express = require("express");
var application = express();
// improving listen will not do matter with the process.Need to keep notes here.
application.listen(process.env.PORT,process.env.IP);

var msgs = new Array();

application.get('/',function(req,res){
    res.send("Welcome to multter")
});

application.post('/send',express.bodyParser(),function(req,res){
    if(req.body && req.body.msg){
        msgs.push(req.body.msg);
        res.send({status:"OK",message:"send successfully"});
    }else{
        res.send({status:"WARNING",message:"send failed"});
    }
});

application.get('/multter',function(req, res) {
    res.send(msgs);
})

