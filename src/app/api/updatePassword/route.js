import { sendEmail } from "../../../helpers/mailer";
import dbConnect from "../../../lib/dbConnect";
import User from "../../../models/user";
import bcrypt from "bcryptjs";
dbConnect();
export async function POST(request) {
  try {
    const reqBody = await request.json();

    const { email, password,} = reqBody;
    const user = await User.findOne({
      email,
    });
    if (!user) {
      return new Response(
        JSON.stringify({ error: "Invalid User Details", success: false }),
        {
          status: 400,
        }
      );
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    user.password = hashedPassword;
    await user.save();

    return new Response(
      JSON.stringify({
        message: `User Password Updated Successfully`,
        success: true,
      }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message, success: false }),
      {
        status: 200,
      }
    );
  }
}
