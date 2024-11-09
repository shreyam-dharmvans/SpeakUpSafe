import { createTransport, Transporter } from 'nodemailer';

let transporter: Transporter | null = null;

export const getTransporter: () => Transporter = () => {
    if (transporter) {
        console.log("transport already exist");
        return transporter;
    }

    transporter = createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD,
        },
    });

    return transporter;

}

