import nodemailer from "nodemailer";

export const getRequestEmail = async ({
  email,
  name,
  message,
  id,
  address,
  url,
}) => {
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
      replyTo: mail,
      to: mail,
      subject: `A new request ${id} received`,
      text: `A new request  received from ${name}!`,
      html: `<h1 style="text-align:center; color:blue; ">Hello Mr. Sukanta Paul.</h1>
      <br/>
      <h1 style="text-align:center; color:blue; ">A website user  ${name} from ${address} has sent you the following request with ${id}.</h1>
      <br/>
        <h2 style="text-align:center; color:blue;">${message}</h2>`,
    };
    const mailDataWithImage = {
      from: {
        name: `MLA SUKANTA PAUL'S WEBSITE`,
        address: mail,
      },
      replyTo: mail,
      to: mail,
      subject: `A new request ${id} received`,
      text: `A new request  received from ${name}!`,
      html: `<h1 style="text-align:center; color:blue; ">Hello Mr. Sukanta Paul.</h1>
      <br/>
      <h1 style="text-align:center; color:blue; ">A website user  ${name} from ${address} has sent you the following request with ${id}.</h1>
      <br/>
          <img
            alt="imgRequest"
            src=${url}
            style="width: 200px;
            height: auto;
            border-radius: 10px;"
          />
      <br/>
        <h2 style="text-align:center; color:blue;">${message}</h2>`,
    };

    await new Promise((resolve, reject) => {
      // send mail
      transport.sendMail(
        url == "" ? mailData : mailDataWithImage,
        (err, info) => {
          if (err) {
            console.error(err);
            reject(err);
          } else {
            console.log("Email Sent: " + info.response);
            resolve(info);
          }
        }
      );
    });
    return "Email sent successfully";
  } catch (error) {
    console.log(error);
  }
};
