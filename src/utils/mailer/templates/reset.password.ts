import 'dotenv/config';
import { generateToken } from '../../user.utils';

const { APP_URL_FRONTEND } = process.env;

export default (data) => {
  const message: any = {};
  const token = generateToken(data);
  const link = `${APP_URL_FRONTEND}/reset-password/${token}`;
  message.subject = 'Reset your password - AMS';
  message.html = `
  Hello ${data.userName} </br>
  <p style="font-size: 1rem; color:#266cef">You are receiving this because you have requested to reset your password,<br>
   Click on the button bellow to complete the process<br>
  <br><br><br>
  <a href='${link}' style="margin:35px 0;padding:15px 35px;background:#266cef;color:#ffffff;clear:both;border-radius:30px;text-decoration:none" target='_blank'>Resert password Now</a></p>
  `;
  return message;
};
