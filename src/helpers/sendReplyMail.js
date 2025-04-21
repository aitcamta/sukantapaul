import nodemailer from "nodemailer";

export const sendReplyMail = async ({ reply, id, message, email, name }) => {
  try {
    // const hasedToken = await bcrypt.hash(userId.toString(), 10);

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
    const mailData = {
      from: {
        name: `MLA SUKANTA PAUL'S WEBSITE`,
        address: mail,
      },
      replyTo: email,
      to: email,
      subject: `Email from SUKANTA PAUL for ${id}`,
      text: `Hello Dear ${name}!`,
      html: `<h1 style="text-align:center; color:blue; ">Hello Dear ${name}</h1>
        <h2 style="text-align:center; color:blue;">This is a response for YourToken number ${id}.</h2>,
        <h2 style="text-align:center; color:blue;">I am happy to hear your Message:\n${message}</h2>,
        <h2 style="text-align:center; color:blue;">My Reply is:\n${reply}</h2>`,
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
