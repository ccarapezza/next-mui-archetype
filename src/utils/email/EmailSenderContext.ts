import EmailSenderStrategy from "./EmailSenderStrategy";
import EmailSenderNodemailerStrategy from "./EmailSenderNodemailerStrategy";
import EmailSenderAWSStrategy from "./EmailSenderAWSStrategy";

const strategy: EmailSenderStrategy = process.env.EMAIL_SENDER_STRATEGY === 'nodemailer' ? new EmailSenderNodemailerStrategy() : new EmailSenderAWSStrategy();

async function sendBulkEmail({ templateName, to, from, subject, htmlPart }: { templateName: string, to: string[], from: string, subject: string, htmlPart: string }) {
    //Send bulk email using the strategy
    return await strategy.sendBulkEmail({ templateName, to, from, subject, htmlPart });
}

async function sendEmail({ to, from, subject, html }: { to: string, from: string, subject: string, html: string }) {
    //Send email using the strategy
    return await strategy.sendEmail({ to, from, subject, html });
}

async function sendVerificationEmail({ email, token }: { email: string, token: string }) {
    //Send verification email using the strategy
    return await strategy.sendVerificationEmail({ email, token });
}

async function sendWelcomeEmail({ email, url, temporalPassword }: { email: string, url: string, temporalPassword: string }) {
    //Send welcome email using the strategy
    return await strategy.sendWelcomeEmail({ email, url, temporalPassword });
}

const EmailSenderContext = {
    sendBulkEmail,
    sendEmail,
    sendVerificationEmail,
    sendWelcomeEmail,
};

export default EmailSenderContext;