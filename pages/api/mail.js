//      NODEMAILER

// let nodemailer = require('nodemailer');

// let mailOptions = {
//   from: '<FROM_EMAIL_ADDRESS>',
//   to: '<TO_EMAIL_ADDRESS>',
//   subject: 'Email from Node-App: A Test Message!',
//   text: 'Some content to send'
// };

//
//
//
//
//      EMAILJS

// const emailjs = require('emailjs-com');
// global.XMLHttpRequest = require('xhr2');
// emailjs.init('user_FyVHB2ZfDjkG5oE4yjGyi');


// await emailjs.send('service_l0i0owc', 'template_ou7q0k7', {
  //   message: body.message + '                                                 ',
  //   to_email: body.email,
  //   subject: '[' + body.time + '] ',
  // });
  


//
//
//
//
//      SENDGRID

const mail = require('@sendgrid/mail');

mail.setApiKey(process.env.SENDGRID_API_KEY);

export default async (req, res) => {
  const body = await JSON.parse(req.body);

  const data = await {
    from: 'myweeksapp@gmail.com',
    subject: '    ',
    text: '[' + body.time + '] ' + body.message,
    to: body.email,
  };

  if (body.notifTime) {
    data.send_at = await parseInt(body.notifTime);
  }

  await mail.send(data);



  await res.status(200).json({ status: 'Ok' });
};
