const nodemailer = require('nodemailer');
const { logger } = require('../../utils');


const controller = {
  sendResultInEmail(req, res) {
    try {
      const { to, subject, text } = req.body;
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'ashutec.demo@gmail.com',
          pass: 'ashutec@2017',
        },
      });

      const mailOptions = {
        from: 'ashutec.demo@gmail.com',
        to,
        subject,
        html: `<b>${text}</b><br/><h4>pdf</h4>`,
        attachments: [{
          filename: req.file.filename,
          path: req.file.path,
          contentType: 'application/pdf',
        }],

      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          logger.error(error);
          res.status(200).send({ success: true, message: error });
        } else {
          logger.log(`Email sent: ${info.response}`);
          res.status(200).send({ success: true, message: 'mail sent success' });
          // res.status(200).send({ success: true, message: info.response });
        }
      });
    } catch (error) {
      logger.error(error);
      res.status(500).send({ success: false, message: 'Internal server error' });
    }
  },
};

module.exports = controller;
