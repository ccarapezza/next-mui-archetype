export default abstract class EmailSenderStrategy {
    abstract sendBulkEmail({ templateName, to, from, subject, htmlPart }: { templateName: string, to: string[]; from: string; subject: string; htmlPart: string; }): void;    
    abstract sendEmail({ to, from, subject, html }: { to: string; from: string; subject: string; html: string; }): void;
    abstract sendVerificationEmail({ email, token }: { email: string; token: string; }): void;
    abstract sendWelcomeEmail({ email, url, temporalPassword }: { email: string; url: string; temporalPassword: string; }): void;
}