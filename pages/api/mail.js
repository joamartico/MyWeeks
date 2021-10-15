const mail = require('@sendgrid/mail');

mail.setApiKey(process.env.SENDGRID_API_KEY);


export default (req, res) => {
  const body = JSON.parse(req.body);

  const data = {
    from: 'myweeksapp@gmail.com',
    subject: body.message,
    text: "",
    to: body.email,
    send_at: parseInt(body.notifTime),
  };

  mail.send(data);

  res.status(200).json({ status: 'Ok' });
};
