// day 12.9.2015 @zhe13
//      learning from theJian,use express instead of the native http/net to buila a chatroom
//      and it helps me to understand the server.js and router.js
// day 12.10.2015 @zhe13
//      transport from express 3.x to 4.x
// day 12.10.2015 @zhe13
//      add render.a function to redirect browsers


// note :I DONT THINK ITs a good choic
"use strict"
var express = require("express");
var body_parser = require("body-parser");
var application = express();
// improving listen will not do matter with the process.Need to keep notes here.
application.listen(process.env.PORT,process.env.IP);

var msgs = new Array();

application.get('/',function(req,res){
    // res.send("Welcome to multter,User")
    var title = "Multter";
    var header= "Welcome to Multter";
    
    
    res.render("index",{
        "title":title,
        "header":header,
        "msgs":msgs,
        stylesheets :[]
    },function(err,html){
        if(err){
            console.log("err",err);
            return;
        }else{
            console.log(html);
        }
    });
    
});

// express no longer provides so many middleware,need to install it separately.
application.post('/send',body_parser.urlencoded({extended:true}),function(req,res){
    if(req.body && req.body.msg){
        msgs.push(req.body.msg);
        
        
        if(acceptsHtml(req.header["accept"])){
            res.redirect('/',302);
        }else{
        res.send({status:"OK",message:"received successfully"});    
        }
        
        
    }else{
        console.log(req);
        res.send({status:"WARNING",message:"received failed"});
    }
});

application.get('/multter',function(req, res) {
    res.send(msgs);
})


// this function tells API clients from Browsers.
function acceptsHtml(header){
    var accepts = header.split(',');
    for(let x in accepts){
        if(accepts[x] === "text/html"){
            return true;
        }
        return false;
    }
}
