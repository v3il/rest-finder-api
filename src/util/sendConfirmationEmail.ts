import { SentMessageInfo } from 'nodemailer';

import config from '../config';
import { translateText, createMailTransporter, getTemplateHTML } from './index';
import { User } from '../models';

export default async (user: User, locale: string): Promise<SentMessageInfo> => {
    const transporter = createMailTransporter();

    const html = await getTemplateHTML('basic_email_template', {
        message: translateText('resetPasswordEmailMessage', locale),
        linkText: translateText('resetPasswordEmailLinkText', locale),
        href: `${config.SERVER_URL}/auth/verify_email/${user.userHash}`,
    });

    // const html = await getTemplateHTML('email_confirmation', {
    //     userHash,
    //     locale,
    //     serverURL: config.SERVER_URL,
    //     message: translateText('confirmationEmailMessage', locale),
    //     buttonText: translateText('confirmationEmailButtonText', locale),
    // });

    const mailOptions = {
        html,
        from: `"Rest Finder" <${config.MAIL_USER}>`,
        to: user.email,
        subject: translateText('confirmationEmailTitle', locale),
    };

    return transporter.sendMail(mailOptions);
};
