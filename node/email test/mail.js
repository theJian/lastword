// created by zhe13 @ 12.1.2015
// use module NodeMailer
// ***
// 
// 

var nodemail = require("nodemailer");

// --in 0.x version you'd better ot use this statement and option
// var transport = nodemail.createTransport("SMTP",{
// 	host:"smtp.qq.com",
// 	secureConnection: true, // use SSL
//     port: 465, // port for secure SMTP
//     auth: {
//         user: "827006579@qq.com",
//         pass: "wtzwtz"
//     }
// });

// for STMP transmission

// for well known producer
var transport = nodemail.createTransport({
	service:"Gmail",
	auth:{
		user:"@gmail.com",
		pass:"*"
	}
})
// to find more service producer,
// check this link https://github.com/andris9/nodemailer-wellknown#supported-services

var mail_option = {
	from	:"LAST_WORD<wutianzhe123@gmail.com>",
	to		:'wutianzhe123@yeah.net,827006579@qq.com',
	subject :"FIRST MAIL",
	text	:"Hello!User",
	html	:"<br/>Hello <br/>User"
}

transport.sendMail({
	
},function(err,response){
	if(err){
		console.log(err);
	}else{
		console.log("Msg"+response.messageId);
	}
	transport.close();
})