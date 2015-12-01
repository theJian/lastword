// created by zhe13 @ 12.1.2015
// use module NodeMailer
// ***
// 
// 

var nodemail = require("nodemailer");

// in 0.x version you'd better ot use this synx
// var transport = nodemail.createTransport("SMTP",{
// 	host:"smtp.qq.com",
// 	secureConnection: true, // use SSL
//     port: 465, // port for secure SMTP
//     auth: {
//         user: "827006579@qq.com",
//         pass: "wtzwtz"
//     }
// });

var transport = nodemail.createTransport({
	service:"Gmail",
	auth:{
		user:"test@gmail.com",
		pass:"PASSWORD"
	}
})

var mail_option = {
	from	:"LAST_WORD",
	to		:"wutianzhe123@yeah.net",
	subject :"FIRST MAIL",
	generateTextFromHTML:true,
	html	:"<br/>Hello <br/>User"
}

transport.sendMail({
	
},function(err,response){
	if(err){
		console.log(err);
	}else{
		console.log("Msg"+response.message);
	}
	transport.close();
})