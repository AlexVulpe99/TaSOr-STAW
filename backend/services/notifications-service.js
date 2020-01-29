require('dotenv').config();

const nodemailer = require("nodemailer");

function sendMail(text, email) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: `${process.env.EMAIL_ADDRESS}`,
            pass: `${process.env.EMAIL_PASSWORD}`,
        },
    });
    const mailOptions = {
        from: 'tasor@gmail.com',
        to: `${email}`,
        subject: 'Notification',
        text: text,
    };

    transporter.sendMail(mailOptions, (err, response) => {
        if (err) {
            throw err;
        } else {
            console.log('response mail : ', response);
            return true;
        }
    })
}

module.exports = { sendMail }