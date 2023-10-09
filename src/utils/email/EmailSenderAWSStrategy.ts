import { SESClient, SendBulkTemplatedEmailCommand, SendEmailCommand } from "@aws-sdk/client-ses";
import EmailSenderStrategy from "./EmailSenderStrategy";

export default class EmailSenderAWSStrategy extends EmailSenderStrategy {
    client: SESClient;
    constructor() {
        super();
        this.client = new SESClient({ region: 'us-east-1' });
    }
    async sendBulkEmail({ templateName, to, from, subject, htmlPart }: { templateName: string, to: string[], from: string, subject: string, htmlPart: string }) {
        const params = {
            Destinations: [{ Destination: { ToAddresses: to } }],
            Source: from,
            Template: templateName,
            TemplateData: JSON.stringify({
                subject,
                htmlPart,
            }),
        };
        try {
            const command = new SendBulkTemplatedEmailCommand(params);
            const result = await this.client.send(command);
            console.log('Bulk email sent:', result.Status);
            return result.Status;
        }
        catch (error) {
            console.error('Error sending bulk email:', error);
            throw error;
        }
    }
    async sendEmail({ to, from, subject, html }: { to: string, from: string, subject: string, html: string }) {
        const params = {
            Source: from,
            Destination: { ToAddresses: [to] },
            Message: {
                Subject: { Data: subject },
                Body: { Html: { Data: html } },
            },
        };
        try {
            const command = new SendEmailCommand(params);
            const result = await this.client.send(command);
            console.log('Email sent:', result.MessageId);
            return result.MessageId;
        }
        catch (error) {
            console.error('Error sending email:', error);
            throw error;
        }
    }
    async sendVerificationEmail({ email, token }: { email: string, token: string }) {
        const url = `${process.env.NEXT_PUBLIC_SITE_ENDPOINT}/verify-email?token=${token}`;
        if (process.env.NODE_ENV === 'development') {
            console.log(`Verification link: ${url}`);
        }
        return await this.sendEmail({
            to: email,
            from: `noreply@${process.env.DOMAIN}`,
            subject: 'Verify your email',
            html: `<h1>Verify your email</h1><p>Thanks for signing up! To verify your email address, please click the link below.</p><a href="${url}">Verify your email</a>`,
        });
    }
    async sendWelcomeEmail({ email, url, temporalPassword }: { email: string, url: string, temporalPassword: string }) {
        return await this.sendEmail({
            to: email,
            from: `noreply@${process.env.DOMAIN}`,
            subject: 'Welcome to the site!',
            html: `<h1>Welcome to the site!</h1><p>Your temporary password is: <strong>${temporalPassword}</strong></p><p>Please <a href="${url}">click here</a> to login and change your password.</p>`,
        });
    }
}