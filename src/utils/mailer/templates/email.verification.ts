import 'dotenv/config';
import { generateToken } from '../../user.utils';

const { APP_URL_FRONTEND } = process.env;

export default (data) => {
  const message: any = {};
  const token = generateToken(data);
  const link = `${APP_URL_FRONTEND}/verify-email/${token}`;
  message.subject = 'Email verification - AMS';
  message.html = `
  <h2>Hello ${data.userName}</h2> </br>
  <p style="font-size: 1rem; color:#266cef">Welcome to AMS, the best in assets management platforms.<br>
  To complete the email verification process, please click on the button bellow.<br>
  <br><br><br>
  <a href='${link}' style="margin:35px 0;padding:15px 35px;background:#266cef;color:#ffffff;clear:both;border-radius:30px;text-decoration:none" target='_blank'>Verify your account</a></p>
  `;
  return message;
};
