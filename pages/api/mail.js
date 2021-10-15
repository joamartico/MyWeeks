// import { SENDGRID_API_KEY } from "../../constants/env";

const mail = require('@sendgrid/mail');

// mail.setApiKey(SENDGRID_API_KEY);
mail.setApiKey('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');

export default (req, res) => {
  const body = JSON.parse(req.body);

  const data = {
    from: 'myweeksapp@gmail.com',
    subject: '[' + body.time + ']',
    text: body.message,
    to: body.email,
    send_at: parseInt(body.notifTime),
  };

  console.log(data);

  mail.send(data);

  res.status(200).json({ status: 'Ok' });
};
