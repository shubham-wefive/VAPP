var nodemailer = require('nodemailer');

const EmailServiceOtp = (userEmail, OTP) => 
{
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'youremail@gmail.com',
          pass: 'yourpassword'
        }
      });

    var mailOptions = {
    from: 'youremail@gmail.com',
    to: userEmail,
    subject: 'Sending Email using Node.js',
    text: `this is OTP for forgot password  --> +${OTP}`
    };

    transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        console.log(error);
    } else {
        console.log(`Email sent: ${userEmail}` + info.response);
    }
    });
}

module.exports = EmailServiceOtp;