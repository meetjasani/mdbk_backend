/* eslint-disable no-plusplus */
import sgMail from '@sendgrid/mail';
import config from '../config/config';
import logger from '../config/logger';

sgMail.setApiKey(config.email.apiKey);

export default class EmailService {
    public sendEmail = async (to: string, subject: string, text: string) => {
        const msg = { from: config.email.from, to, subject, html: text };
        sgMail
            .sendMultiple(msg)
            .then(() => logger.info(`Mail sent to ${to}`))
            .catch(error => logger.warn(`Failed to send mail to ${error}`));
    };

    /**
     * Send reset password email
     * @param {string} to
     * @param {string} token
     * @returns {Promise}
     */
    public sendEmailVerification = async (to: string, code: number) => {
        const subject: string = 'Please verify your email';
        const text: string = `Hello,<br><br>
  Please copy the verification code below and paste it onto the screen <br><br>
  <strong>${code}</strong><br><br>`;
        const email = await this.sendEmail(to, subject, text);
        return email;
    };
}