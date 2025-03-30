import User from "../models/user";
import nodemailer from "nodemailer";
import { v4 as uuid } from "uuid";

export const sendEmail = async ({ email, emailType, userId, name }) => {
  try {
    // const hasedToken = await bcrypt.hash(userId.toString(), 10);
    const hasedToken = uuid();

    if (emailType == "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        $set: {
          verifyToken: hasedToken,
          verifyTokenExpiry: Date.now() + 3600000,
        },
      });
    } else if (emailType == "RESET") {
      await User.findByIdAndUpdate(userId, {
        $set: {
          forgotPasswordToken: hasedToken,
          forgotPasswordTokenExpiry: Date.now() + 3600000,
        },
      });
    }
    const mail = process.env.AITCAMTA_GMAIL_ID;
    const mailpassword = process.env.AITCAMTA_GMAIL_PASSWORD;
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: mail,
        pass: mailpassword,
      },
    });
    await new Promise((resolve, reject) => {
      // verify connection configuration
      transport.verify(function (error, success) {
        if (error) {
          console.log(error);
          reject(error);
        } else {
          console.log("Server is ready to take our messages");
          resolve(success);
        }
      });
    });
    let emailBody = "";
    if (emailType == "VERIFY") {
      emailBody = `<p>Click <a href="${
        process.env.DOMAIN
      }/verifyemail?token=${hasedToken}">here</a> to ${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      }or copy and paste the link below in your browser.<br>
      ${process.env.DOMAIN}/verifyemail?token=${hasedToken}
      </р>`;
    } else if (emailType == "RESET") {
      emailBody = `<p>Click <a href="${
        process.env.DOMAIN
      }/resetpassword?token=${hasedToken}">here</a> to ${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      }or copy and paste the link below in your browser.<br>
      ${process.env.DOMAIN}/resetpassword?token=${hasedToken}
      </р>`;
    }
    const mailData = {
      from: {
        name: `WBTPTA AMTA WEST`,
        address: mail,
      },
      replyTo: email,
      to: email,
      subject:
        emailType == "VERIFY" ? "Verify Your Email" : "RESET Your Password", // Subject line
      text: `Hello Dear ${name}!`,
      html: emailBody,
    };

    await new Promise((resolve, reject) => {
      // send mail
      transport.sendMail(mailData, (err, info) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          console.log("Email Sent: " + info.response);
          resolve(info);
        }
      });
    });
    return "Email sent successfully";
  } catch (error) {
    console.log(error);
  }
};
