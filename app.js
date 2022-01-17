const express=require('express');
const app=express();
const nodemailer=require('nodemailer');
const port= process.env.PORT || 3000;
app.listen(port);
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
app.get('/',(req,res)=>{
    
    res.render('index');
});
app.post('/',(req,res)=>{
    console.log("req made");
    console.log(req.body);
    var name=req.body.name;
    var senderEmail=req.body.senderEmail;
    var password=req.body.password;
    var receiverEmail=req.body.receiverEmail;
    var subject=req.body.subject;
    var message=req.body.message;
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: senderEmail,
              pass: password
            }
          });
          
          var mailOptions = {
            from: name,
            to: receiverEmail,
            subject: subject,
            text:message
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
              let alert = require('alert'); 
              alert(error);
            } else {
              console.log('Email sent: ' + info.response);
              res.redirect('/');
              let alert = require('alert'); 
              alert("Mail sent!!");
              window.alert("Mail sent!!");
            }
          });
});
app.use((req,res)=>{
    res.sendFile('./public/404.html',{root:__dirname});
})