import dbConnect from "../../../lib/dbConnect";
import User from "../../../models/user";
import bcrypt from "bcryptjs";
import { sendEmail } from "../../../helpers/mailer";

dbConnect();

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { id, name, phone, email, password, gp } = reqBody;

    const user = await User.findOne({ email });
    if (user) {
      return new Response(JSON.stringify({ message: "User already exists" }), {
        status: 400,
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      id,
      name,
      phone,
      email,
      gp,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();

    // Send Verification Email
    await sendEmail({
      email,
      emailType: "VERIFY",
      userId: savedUser._id,
      name: savedUser.name,
    });

    return new Response(
      JSON.stringify({
        message: "User Registered Successfully",
        success: true,
        savedUser,
      }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
