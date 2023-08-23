import { CreateTemplateCommand, DeleteTemplateCommand, SESClient, SendEmailCommand, SendBulkTemplatedEmailCommand, SendBulkTemplatedEmailCommandInput } from "@aws-sdk/client-ses"; // ES Modules import

const client = new SESClient({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
});

async function removeTemplate({ templateName }: { templateName: string; }) {
    const input = { // DeleteTemplateRequest
        TemplateName: templateName, // required
    };
    try {
        const command = new DeleteTemplateCommand(input);
        await client.send(command);
        console.log("Success. Template deleted");
    } catch (err) {
        console.log("Error", err);
    }
}


async function saveTemplate({ templateName, subject, htmlPart, textPart }: { templateName: string; subject: string; htmlPart: string; textPart: string; }) {
    const input = { // CreateTemplateRequest
        Template: { // Template
            TemplateName: templateName, // required
            SubjectPart: subject,
            TextPart: htmlPart,
            HtmlPart: textPart,
        },
    };
    try {

        const command = new CreateTemplateCommand(input);
        await client.send(command);
        console.log("Success. Template created");
    } catch (err) {
        console.log("Error", err);
    }
}

async function sendBulkEmail({ templateName, to, from, subject, htmlPart }: { templateName: string, to: string; from: string; subject: string; htmlPart: string; }) {
    const params: SendBulkTemplatedEmailCommandInput = {
        Source: from,
        Template: templateName,
        Destinations: [
            {
                Destination: {
                    ToAddresses: [to],
                },
            },
        ],
    };
    
    try {
        await saveTemplate({ templateName: templateName, subject, htmlPart, textPart: "htmlPart" });
        const command = new SendBulkTemplatedEmailCommand(params);
        await client.send(command);
        await removeTemplate({ templateName: templateName });

        return true;
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
}


async function sendEmail({ to, from, subject, html }: { to: string; from: string; subject: string; html: string; }) {
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
        const result = await client.send(command);
        console.log('Email sent:', result.MessageId);
        return result.MessageId;
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
}

async function sendVerificationEmail({ email, token }: { email: string; token: string; }) {
    const url = `${process.env.NEXT_PUBLIC_SITE_ENDPOINT}/verify-email?token=${token}`;
    if (process.env.NODE_ENV === 'development') {
        console.log(`Verification link: ${url}`);
    }
    return await sendEmail({
        to: email,
        from: `carapezza.christian@gmail.com`,
        subject: `Sign in to localhost`,
        html: `Use the link below to activate your account on localhost.\n\n${url}`,
    });
}

async function sendWelcomeEmail({ email, url, temporalPassword }: { email: string; url: string; temporalPassword: string; }) {
    return await sendEmail({
        to: email,
        from: `carapezza.christian@gmail.com`,
        subject: `Welcome to localhost`,
        html: `Your temporal password is <strong>${temporalPassword}</strong>. Use the link below to sign in to localhost.\n\n${url}`,
    });
}

const emailUtil = {
    sendEmail,
    sendVerificationEmail,
    sendWelcomeEmail,
    sendBulkEmail
}

export default emailUtil;