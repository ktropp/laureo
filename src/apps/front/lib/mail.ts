'use server'
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
})

export async function sendMail({
                                   from, to, subject, template
                               }: { from: string, to: string, subject: string, template: string }) {
    try {
        const isVerified = await transporter.verify();
    } catch (error) {
        console.error('Something Went Wrong', error);
        return;
    }

    const info = await transporter.sendMail({
        from: from,
        to: to,
        subject: subject,
        text: 'TODO',
        html: 'TODO'
    })
    console.log('Message Sent', info.messageId);
    return info;
}