import nodemailer from 'nodemailer'

export const emailBox = async (name, email) => {

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // Use `true` for port 465, `false` for all other ports
        auth: {
            user: process.env.USER,
            pass: process.env.APP_PASSWORD,
        },
    });

    const mailOptions = {
        from: {
            name: 'Accredian',
            address: process.env.USER
        }, // sender address
        to: email, // list of receivers
        subject: "Referral", // Subject line
        text: "Buy this course and change your future for the good", // plain text body
        html: `<b>Hello ${name} Here is your dream course</b>`, // html body
    }

    await transporter.sendMail(mailOptions)

}