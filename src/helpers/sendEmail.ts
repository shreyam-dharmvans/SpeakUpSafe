import { Resend } from 'resend';
import VerifyEmail from '../../emailTemplate/emailTemplate';
import { apiResponse } from '@/types/apiResponse';
import { getTransporter } from './nodeMailerTransport';


const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (email: string, username: string, verificationCode: number) => {
    try {
        //resend email
        const { data, error } = await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: [process.env.MY_EMAIL as string],
            subject: 'Verification code to verify SpeakUpSafe account',
            react: VerifyEmail({ username, verificationCode, email }),
        });

        if (error) {
            return {
                success: false,
                message: error
            };
        }

        //nodemailer
        let transporter = getTransporter();

        const info = await transporter.sendMail({
            from: process.env.EMAIL,
            to: email,
            subject: "Verification Code SpeakUpSafe",
            text: "Verification Code for your SpeakUpSafe account",
            html: emailHtml.replace('{username}', username).replace('{verificationCode}', verificationCode.toString()).replace('{email}', email),
        });

        console.log(info);


        return {
            success: true,
            message: "Verification code was sent successfully"
        };

    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: "Failed to send Verification code"
        };
    }
}

const emailHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification</title>
    <style>
        body {
            background-color: #fff;
            color: #212121;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
            margin: 0;
            padding: 0;
        }
        .container {
            padding: 15px;
            margin: 0 auto;
            background-color: #eee;
            max-width: 600px;
            border-radius: 8px;
        }
        .coverSection {
            background-color: #fff;
            padding: 15px 20px;
        }
        .imageSection {
            background-color: #555555;
            display: flex;
            padding: 15px 0;
            align-items: center;
            justify-content: center;
            margin-bottom: 0.75rem;
        }
        .heading {
            color: #333;
            font-size: 16px;
            font-weight: bold;
            margin-bottom: 15px;
            text-align: center;
        }
        .text {
            color: #333;
            font-size: 12px;
            line-height: 1.4;
            margin-bottom: 15px;
        }
        .verificationSection {
            display: table;
            width: 100%;
            margin: 15px 0;
        }
        .verificationRow {
            display: table-row;
            margin: auto;
        }
        .verificationCell {
            display: table-cell;
            text-align: center;
            vertical-align: middle;
            padding: 5px 0;
        }
        .verifyText {
            font-weight: bold;
            font-size: 14px;
        }
        .codeText {
            font-weight: bold;
            font-size: 28px;
            margin: 8px 0;
        }
        .validityText {
            font-size: 11px;
            color: #666;
        }
        .lowerSection {
            padding: 15px 20px;
            border-top: 1px solid #ddd;
        }
        .footerText {
            font-size: 10px;
            color: #333;
            text-align: center;
            padding: 15px;
            line-height: 1.4;
        }
        .link {
            color: #2754C5;
            text-decoration: underline;
        }
        .image{
            margin: auto;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="coverSection">
            <div class="imageSection">
                <img src="https://tse4.mm.bing.net/th?id=OIP.ywlP4yw1NCpdGu09pWQgiAHaEK&pid=Api&P=0&h=180" height="70" class='image' alt="SpeakUpSafe's Logo" />
            </div>
            <div class="upperSection">
                <div class="heading">Verification Code for {email}</div>
                <div class="text">
                    Hi {username},<br>
                    Thanks for starting the new account creation process. We want to make sure it's really you. Please enter the following verification code when prompted. If you don’t want to create an account, you can ignore this message.
                </div>
                <div class="verificationSection">
                    <div class="verificationRow">
                        <div class="verificationCell verifyText">Verification code</div>
                    </div>
                    <div class="verificationRow">
                        <div class="verificationCell codeText">{verificationCode}</div>
                    </div>
                    <div class="verificationRow">
                 
                    </div>
                </div>
            </div>
            <div class="lowerSection">
                <div class="text">
                    SpeakUpSafes Services will never email you and ask you to disclose or verify your password, credit card, or banking account number.
                </div>
            </div>
        </div>
        <div class="footerText">
            This message was produced and distributed by SpeakUpSafes Services, Inc., 410 Terry Ave. South, Delhi, WA 98109. © 2022, SpeakUpSafe Services, Inc. All rights reserved. AF is a registered trademark of 
            <a href="https://amazon.com" target="_blank" class="link">Amazon.com</a>. View our 
            <a href="https://amazon.com" target="_blank" class="link">privacy policy</a>.
        </div>
    </div>
</body>
</html>
`
//#252f3d;
// const emailHtml = `
// <!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>Email Verification</title>
//     <style>
//         body {
//             background-color: #fff;
//             color: #212121;
//             font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
//             margin: 0;
//             padding: 0;
//         }
//         .container {
//             padding: 20px;
//             margin: 0 auto;
//             background-color: #eee;
//             max-width: 600px;
//             border-radius: 8px;
//         }
//         .coverSection {
//             background-color: #fff;
//             padding: 25px 35px;
//         }
//         .imageSection {
//             background-color: #252f3d;
//             display: flex;
//             padding: 20px 0;
//             align-items: center;
//             justify-content: center;
//         }
//         h1 {
//             color: #333;
//             font-size: 20px;
//             font-weight: bold;
//             margin-bottom: 15px;
//         }
//         .mainText {
//             color: #333;
//             font-size: 14px;
//             margin: 24px 0;
//         }
//         .verificationSection {
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             flex-direction: column;
//             margin: 20px 0;
//         }
//         .verifyText {
//             font-weight: bold;
//             margin: 0;
//             text-align: center;
//         }
//         .codeText {
//             font-weight: bold;
//             font-size: 36px;
//             margin: 10px 0;
//             text-align: center;
//         }
//         .validityText {
//             margin: 0;
//             text-align: center;
//         }
//         .lowerSection {
//             padding: 25px 35px;
//         }
//         .cautionText {
//             font-size: 14px;
//             color: #333;
//             margin: 0;
//         }
//         .footerText {
//             font-size: 12px;
//             color: #333;
//             padding: 0 20px;
//             text-align: center;
//         }
//         .link {
//             color: #2754C5;
//             text-decoration: underline;
//         }
//     </style>
// </head>
// <body>
//     <div class="container">
//         <div class="coverSection">
//             <div class="imageSection">
//                 <img src="https://tse4.mm.bing.net/th?id=OIP.ywlP4yw1NCpdGu09pWQgiAHaEK&pid=Api&P=0&h=180" width="75" height="45" alt="SpeakUpSafe's Logo" />
//             </div>
//             <h1>Verify Code for {email}</h1>
//             <p class="mainText">Hi {username},<br>
//             Thanks for starting the new account creation process. We want to make sure it's really you. Please enter the following verification code when prompted. If you don’t want to create an account, you can ignore this message.</p>
//             <div class="verificationSection">
//                 <p class="verifyText">Verification code</p>
//                 <p class="codeText">{verificationCode}</p>
//                 <p class="validityText">(This code is valid for 30 minutes)</p>
//             </div>
//             <hr />
//             <div class="lowerSection">
//                 <p class="cautionText">SpeakUpSafe Services will never email you and ask you to disclose or verify your password, credit card, or banking account number.</p>
//             </div>
//         </div>
//         <p class="footerText">
//             This message was produced and distributed by SpeakUpSafe Services, Inc., 410 Terry Ave. South, Delhi, WA 98109. © 2022, SpeakUpSafe Services, Inc. All rights reserved. AF is a registered trademark of <a href="https://amazon.com" target="_blank" class="link">Amazon.com</a>, Inc. View our <a href="https://amazon.com" target="_blank" class="link">privacy policy</a>.
//         </p>
//     </div>
// </body>
// </html>
// `;
