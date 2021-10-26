// let nodemailer = require('nodemailer');

// let mailOptions = {
//   from: '<FROM_EMAIL_ADDRESS>',
//   to: '<TO_EMAIL_ADDRESS>',
//   subject: 'Email from Node-App: A Test Message!',
//   text: 'Some content to send'
// };










const mail = require('@sendgrid/mail');

mail.setApiKey('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');

export default async (req, res) => {
  const body = await JSON.parse(req.body);

  const data = await {
    from: 'myweeksapp@gmail.com',
    subject: '[' + body.time + ']',
    text: body.message,
    to: body.email,
  };

  if(body.notifTime){
    data.send_at = await parseInt(body.notifTime)
  }



  console.log(data);

  await mail.send(data);

  await res.status(200).json({ status: 'Ok' });
};





