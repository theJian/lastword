// created by zhe13 @ 12.1.2015
// use module NodeMailer
// ***
//zhe13 @ 12.2.2015 use virtual stmp mail address instead of Gamil
// 

var nodemail = require("nodemailer");

// --STMP Mode,in vision0.x,need to add "STMP"
// var transport = nodemail.createTransport({
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
		user:"lastword2016",
		pass:"2016lastword",
		xoauth2:""
	}
});
// to find more service producer,
// check this link https://github.com/andris9/nodemailer-wellknown#supported-services

var mail_option = {
	from	:"LAST_WORD<123@qq.com>",
	to		:'thejianmail@gmail.com',
	subject :"FIRST MAIL",
	text	:"Hello!User",
	html	:"<br/>Hello <br/>User",
	// attachments
	attachments:[
		{
			filename:"家庭教师.avi",
			content:new Buffer("Here is a porn!","utf-8")
		}
	] 
};

transport.sendMail(mail_option,function(err,response){
	if(err){
		console.log(err);
	}else{
		console.log("Msg"+response.messageId);
	}
	transport.close();
});