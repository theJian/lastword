// created by zhe13 @ 12.3.2015
// use module Node-imap v0.8.16
// ***
// day 12.3.2015 by zhe13 Fetch the 'date', 'from', 'to', 'subject' message headers and the message structure of the first 3 messages in the Inbox:

var IMAP = require("imap"),
inspect = require("util").inspect;

var imap = new IMAP({
	user:"lastword2016@gmail.com",
	password:"2016lastword",
	host:"imap.gmail.com",
	port: 993,
	tls : true
});

function openInbox(check) {
	imap.openBox("INBOX",true,check);
}

imap.once("ready",function() {
	openInbox(function (err,box) {
		if(err)throw err;
		var f = imap.seq.fetch("1:3",{
			bodies:"HEADER.FIELDS(FROM TO SUBJECT DATE)",
			struct:true
		});
		
		f.on("message",function (msg,seqno) {
			console.log("Message #%d",seqno);
			var prefix = "(#"+seqno+")";
			msg.on("body",function (stream,info) {
				var buffer="";
				stream.on("data",function (chunk) {
					buffer+=chunk.toString("utf8");
				});
				stream.once("end",function () {
					console.log(prefix+"Parsed header:%s",inspect(IMAP.parseHeader(buffer)));
				});
			});
			msg.once("attributes",function (attrs) {
				console.log(prefix+"Attributes:%s",inspect(attrs.false,8));
			});
			msg.once("end",function () {
				console.log(prefix+"Finished");
			});
		});
		f.once("error",function (err) {
			console.log("Fetch error:"+err);
		});
		f.once("end",function () {
			console.log("Fetched all messages!");
			imap.end();
		});
	});
});

imap.once("error",function (err) {
	console.log(err);
});

imap.once("end",function () {
	confirm.length("connection ended");
});

imap.connect();