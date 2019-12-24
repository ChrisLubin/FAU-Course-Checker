const config = require('config');
const nodemailer = require('nodemailer');

const service = config.get('fromEmailService');
const email = config.get('fromEmail');
const pass = config.get('password');
const to = config.get('toEmail');

function sendEmail(courseEnrollable, courseWaitlistJoinable, course) {
  let emailText;

  if (courseEnrollable) {
    emailText = `${course.subject} ${course.number} w/ CRN:${course.crn} now has a spot you can enroll in! Hurry up and fill it!`;
  } else if (courseWaitlistJoinable) {
    emailText = `${course.subject} ${course.number} w/ CRN:${course.crn} now has a spot open on the waitlist! Hurry up and fill it!`;
  }
  emailText += '\n\nP.S. If you try to join the class and the spot is already taken, you have to restart the app.'; // Reminder

  const transporter = nodemailer.createTransport({
    service,
    auth: {
      user: email,
      pass
    }
  });

  const mailOptions = {
    from: email,
    to,
    subject: 'Course Checker',
    text: emailText
  };

  transporter.sendMail(mailOptions, error => {
    if (error) {
      throw new Error(error);
    }
  });
}

module.exports = sendEmail;
