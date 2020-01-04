import { SentMessageInfo } from 'nodemailer';

import config from '../config';
import { translateText, createMailTransporter, getTemplateHTML } from './index';
import { User } from '../models';

export default async (user: User, locale: string): Promise<SentMessageInfo> => {
    const transporter = createMailTransporter();

    const html = await getTemplateHTML('basic_email_template', {
        message: translateText('confirmationEmailMessage', locale),
        linkText: translateText('confirmationEmailButtonText', locale),
        href: `${config.SERVER_URL}/auth/verify_email/${user.userHash}`,
    });

    const mailOptions = {
        html,
        from: `"Rest Finder" <${config.MAIL_USER}>`,
        to: user.email,
        subject: translateText('confirmationEmailTitle', locale),
    };

    return transporter.sendMail(mailOptions);
};
