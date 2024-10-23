const nodemailer = require('nodemailer');

async function Mailer(email,subject, body) {
  try {

    const transporter = nodemailer.createTransport({
      service: 'gmail', 
      auth: {
        user: "akriticomputercenter.official@gmail.com", 
        pass: "ojpb lztf mquw qxtx", 
      },
    });

    const mailOptions = {
      from: '"Exam Point" "akriticomputer.official@gmail.com"', 
      to: email,
      subject: subject,
      html: body,
    };

    let info = await transporter.sendMail(mailOptions);

    console.log('Email sent: ' + info.response);
    return { success: true, message: 'Email sent successfully' };
  } catch (error) {
    console.error('Error sending email: ', error);
    return { success: false, message: error.message };
  }
}

Mailer("satishresearch369@gmail.com", "Hello", "test")