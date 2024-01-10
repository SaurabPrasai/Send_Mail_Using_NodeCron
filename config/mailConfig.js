const nodeMailer=require("nodemailer");

const transporter = nodeMailer.createTransport({
    service:"gmail",
    host: "smtp.forwardemail.net",
    port: 587,
    secure: false,
    auth: {
      user: process.env.USER_GMAIL,  //your gmail
      pass: process.env.USER_PASSOWRD, //your app password
    },
  });

         // sent data
         const mailOptions={
            from:{
                name:"Prastuti",
                address:process.env.USER_GMAIL
            },
            to:[process.env.RECEIVER_GMAIL],
            subject:null,
            text:null
          }

        module.exports={
            transporter,mailOptions
        }