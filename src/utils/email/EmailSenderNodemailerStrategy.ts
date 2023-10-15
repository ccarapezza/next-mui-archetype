import { SESClient, SendBulkTemplatedEmailCommand, SendEmailCommand } from "@aws-sdk/client-ses";
import EmailSenderStrategy from "./EmailSenderStrategy";
import nodemailer from 'nodemailer';

//Nodemailer sender strategy
export default class EmailSenderNodemailerStrategy extends EmailSenderStrategy {
    transporter: nodemailer.Transporter;
    constructor() {
        super();
        //build nodemailer smtp transporter usign env variables
        this.transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: parseInt(process.env.EMAIL_PORT!),
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            }
        });
    }
    async sendBulkEmail({ templateName, to, from, subject, htmlPart }: { templateName: string, to: string[], from: string, subject: string, htmlPart: string }) {
        //send bulk email using nodemailer

    }
    async sendEmail({ to, from, subject, html }: { to: string, from: string, subject: string, html: string }) {
        //send email using nodemailer
        const info = await this.transporter.sendMail({
            from: from,
            to: to,
            subject: subject,
            html: html,
        });
        
        return info.messageId;
    }
    async sendVerificationEmail({ email, token }: { email: string, token: string }) {
        //send verification email using nodemailer
        const url = `${process.env.NEXT_PUBLIC_SITE_ENDPOINT}/verify-email?token=${token}`;
        if (process.env.NODE_ENV === 'development') {
            console.log(`Verification link: ${url}`);
        }
        return await this.sendEmail({
            to: email,
            from: process.env.EMAIL_USER!,
            subject: 'Verify your email',
            html: `<h1>Verify your email</h1><p>Thanks for signing up! To verify your email address, please click the link below.</p><a href="${url}">Verify your email</a>`,
        });
    }
    async sendWelcomeEmail({ email, url, temporalPassword }: { email: string, url: string, temporalPassword: string }) {
        //send welcome email using nodemailer
        return await this.sendEmail({
            to: email,
            from: process.env.EMAIL_USER!,
            subject: 'Welcome to the site!',
            html: `<h1>Welcome to the site!</h1><p>Your temporary password is: <strong>${temporalPassword}</strong></p><p>Please <a href="${url}">click here</a> to login and change your password.</p>`,
        });
    }
}