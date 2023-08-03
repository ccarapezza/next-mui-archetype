import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses"; // ES Modules import

const client = new SESClient({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
});

async function sendEmail({ to, from, subject, message }: { to: string; from: string; subject: string; message: string; }) {
    const params = {
        Source: from,
        Destination: { ToAddresses: [to] },
        Message: {
            Subject: { Data: subject },
            Body: { Text: { Data: message } },
        },
    };

    try {
        const command = new SendEmailCommand(params);
        const result = await client.send(command);
        console.log('Email sent:', result.MessageId);
        return result.MessageId;
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
}

async function sendVerificationEmail({ email, token }: { email: string; token: string; }) {
    const url = `${process.env.NEXTAUTH_URL}/verify-email?token=${token}`;
    return await sendEmail({
        to: email,
        from: `carapezza.christian@gmail.com`,
        subject: `Sign in to localhost`,
        message: `Use the link below to activate your account on localhost.\n\n${url}`,
    });
}

async function sendWelcomeEmail({ email, url }: { email: string; url: string; }) {
    return await sendEmail({
        to: email,
        from: `carapezza.christian@gmail.com`,
        subject: `Welcome to localhost`,
        message: `Use the link below to sign in to localhost.\n\n${url}`,
    });
}

export default {
    sendEmail,
    sendVerificationEmail,
    sendWelcomeEmail,
}