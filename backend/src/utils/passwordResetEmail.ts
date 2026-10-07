import transporter from "../config/mailer.js";

interface PasswordResetEmailParams {
  email: string;
  name: string;
  resetUrl: string;
}

export const sendPasswordResetEmail = async ({
  email,
  name,
  resetUrl,
}: PasswordResetEmailParams) => {
  await transporter.sendMail({
    from: process.env.MAIL_FROM || process.env.MAIL_USER,
    to: email,
    subject: "Reset your CareerConnect password",

    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Reset Password</title>
        </head>

        <body style="
          margin: 0;
          padding: 0;
          background-color: #f5f7fb;
          font-family: Arial, Helvetica, sans-serif;
        ">

          <div style="
            max-width: 600px;
            margin: 40px auto;
            background: #ffffff;
            border-radius: 12px;
            overflow: hidden;
          ">

            <div style="
              background: #2563eb;
              padding: 24px;
              text-align: center;
            ">
              <h1 style="
                margin: 0;
                color: #ffffff;
                font-size: 28px;
              ">
                CareerConnect
              </h1>
            </div>

            <div style="padding: 40px 32px;">

              <h2 style="
                margin-top: 0;
                color: #111827;
              ">
                Reset your password
              </h2>

              <p style="
                color: #4b5563;
                font-size: 16px;
              ">
                Hi ${name},
              </p>

              <p style="
                color: #4b5563;
                font-size: 16px;
                line-height: 1.6;
              ">
                We received a request to reset your CareerConnect
                account password.
              </p>

              <div style="
                text-align: center;
                margin: 32px 0;
              ">
                <a
                  href="${resetUrl}"
                  style="
                    display: inline-block;
                    background: #2563eb;
                    color: #ffffff;
                    text-decoration: none;
                    padding: 14px 28px;
                    border-radius: 8px;
                    font-size: 16px;
                    font-weight: bold;
                  "
                >
                  Reset Password
                </a>
              </div>

              <p style="
                color: #6b7280;
                font-size: 14px;
                line-height: 1.6;
              ">
                This link will expire in 15 minutes.
              </p>

              <p style="
                color: #6b7280;
                font-size: 14px;
                line-height: 1.6;
              ">
                If you did not request this password reset,
                you can safely ignore this email.
              </p>

            </div>

            <div style="
              padding: 20px;
              background: #f9fafb;
              text-align: center;
              color: #9ca3af;
              font-size: 13px;
            ">
              © ${new Date().getFullYear()} CareerConnect
            </div>

          </div>

        </body>
      </html>
    `,
  });
};