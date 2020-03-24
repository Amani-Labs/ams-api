import 'dotenv/config';
import sendGrid from '@sendgrid/mail';
import * as emailTemplate from './templates';

const sendEmailToUser = async (to: string, action: string, data) => {
  const { SENDGRID_API_KEY, AMS_EMAIL, NODE_ENV } = process.env;

  sendGrid.setApiKey(`${SENDGRID_API_KEY}`);
  const emailSender = emailTemplate[action](data);
  const message = {
    to,
    from: AMS_EMAIL as string,
    subject: emailSender.subject,
    text: 'AMS',
    html: `<div style="background:#ECF0F1;width:100%;padding:20px 0;">
          <div style="max-width:760px;margin:0 auto;background:#ffffff" font-size:1.2em>
          <div style="background:#266cef;padding:10px;color:#ffffff;text-align:center;font-size:34px">
          AMS
          </div>
          <div style="padding:20px;text-align:left;color:black" font-family: verdana>
          ${emailSender.html}
          </div>
          </div>
          <div style="padding:30px 10px;text-align:center;">
          Copyright &copy; 2020
          </div>
          </div>`,
  };
  return NODE_ENV === 'test' ? true : sendGrid.send(message);
};

export default sendEmailToUser;
