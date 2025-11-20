import secret from '../app/secret';
import mailTemplate from './mail-template';

const accountActivationMail = ({
  to,
  name,
  activationToken,
}: {
  to: string;
  name: string;
  activationToken: string;
}) => {
  const activationLink = `${secret.client_url}/activate?token=${activationToken}`;

  return mailTemplate({
    to,
    name,
    subject: 'Activate Your Resume Builder Account',
    body: `
       <body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol';background-color:#f4f4f4;margin:0;padding:0;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;width:100%!important"><div class="container" style="max-width:600px;margin:20px auto;background-color:#fff;border-radius:8px;overflow:hidden;box-shadow:0 4px 6px rgba(0,0,0,.1)"><div class="header" style="background:linear-gradient(135deg,#3b82f6 0%,#a855f7 100%);color:#fff;padding:40px 20px;text-align:center"><h1 style="margin:0;font-size:28px;font-weight:700">Welcome to DocBuilder!</h1><p style="margin:10px 0 0 0;font-size:16px;opacity:0.9">Activate Your Account</p></div><div class="content" style="padding:40px 20px;color:#333;line-height:1.8"><p style="font-size:16px;margin:0 0 20px 0">Hello <strong>${name}</strong>,</p><p style="font-size:15px;color:#555;margin:0 0 20px 0">Thank you for signing up with DocBuilder! We're thrilled to have you join our community of professionals creating stunning resumes and documents.</p><p style="font-size:15px;color:#555;margin:0 0 30px 0">To complete your registration and unlock all the amazing features, please activate your account by clicking the button below:</p><div class="button-container" style="margin:30px 0;text-align:center"><a href="${activationLink}" style="background:linear-gradient(135deg,#3b82f6 0%,#a855f7 100%);color:#fff;padding:16px 40px;border-radius:6px;text-decoration:none;font-weight:700;display:inline-block;font-size:16px;box-shadow:0 4px 6px rgba(59,130,246,0.3);transition:all 0.3s ease">Activate My Account</a></div><p style="font-size:13px;color:#888;text-align:center;margin:20px 0">Or copy and paste this link in your browser:</p><p style="font-size:12px;color:#3b82f6;word-break:break-all;background-color:#f9fafb;padding:12px;border-radius:4px;border-left:4px solid #3b82f6;margin:0 0 30px 0">${activationLink}</p><div class="features" style="background-color:#f9fafb;padding:20px;border-radius:6px;margin:30px 0"><p style="margin:0 0 15px 0;font-weight:700;color:#333">Here's what you can do with DocBuilder:</p><ul style="margin:0;padding-left:20px;color:#555;font-size:14px"><li style="margin-bottom:8px">📄 Create unlimited professional resumes</li><li style="margin-bottom:8px">✨ Use AI-powered content suggestions</li><li style="margin-bottom:8px">🎨 Choose from stunning templates</li><li style="margin-bottom:8px">📊 Track views and engagement metrics</li><li style="margin-bottom:8px">🔒 Bank-level encryption for your data</li></ul></div><p style="font-size:13px;color:#888;margin:30px 0 0 0"><strong>Note:</strong> This activation link will expire in 24 hours. If it has expired, you can request a new one from your account settings.</p></div><div class="footer" style="background-color:#f9fafb;color:#666;padding:25px 20px;text-align:center;font-size:12px;border-top:1px solid #eee"><p style="margin:0 0 10px 0"><strong>&copy; 2025 DocBuilder. All rights reserved.</strong></p><p style="margin:0 0 10px 0">Build stunning professional documents with ease</p><p style="margin:0;color:#999">You received this email because you signed up for a DocBuilder account.</p></div></div></body>
        `,
  });
};

export default accountActivationMail;
