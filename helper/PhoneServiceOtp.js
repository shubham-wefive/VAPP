const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

const PhoneServiceOtp = (phone, OTP) => 
{
  client.messages
    .create({
      body: `VAPP send your OTP is ${OTP}`,
      from: `+91${phone}`,
      to: TWILIO_NUMBER
    })
    .then(message => console.log(message.sid));
}
module.exports = PhoneServiceOtp;