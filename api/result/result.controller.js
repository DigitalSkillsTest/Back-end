const nodemailer = require('nodemailer');
const { logger } = require('../../utils');
const config = require('../../config');


const controller = {
  async sendResultInEmail(req, res) {
    try {
      const { to, subject, text } = req.body;
      const user = config.get('mail.email');
      const pass = config.get('mail.password');
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: { user, pass },
      });

      const mailOptions = {
        from: user,
        to,
        subject,
        html: `<b>${text}</b><br/><h4>pdf</h4>`,
        attachments: [{
          filename: req.file.filename,
          path: req.file.path,
          content: Buffer.from(req.file.buffer, 'utf-8'),
          contentType: req.file.mimetype,
        }],
      };

      const data = await transporter.sendMail(mailOptions);
      await delete req.file;
      // if (error) {
      //   logger.error(error);
      //   res.status(200).send({ success: true, message: error });
      // }

      if (data.response) {
        res.status(200).send({ success: true, message: 'mail sent success' });
      }
    } catch (error) {
      logger.error(error);
      res.status(500).send({ success: false, message: 'Internal server error' });
    }
  },
};

module.exports = controller;
