import { sendEmail } from "../../../helpers/mailer";
import dbConnect from "../../../lib/dbConnect";
import User from "../../../models/user";

dbConnect();
export async function POST(request) {
  try {
    const reqBody = await request.json();

    const { id, name, phone, email, gp } = reqBody;
    const user = await User.findOne({
      id,
    });
    if (!user) {
      return new Response(
        JSON.stringify({ error: "Invalid User Details", success: false }),
        {
          status: 400,
        }
      );
    }

    user.name = name;
    user.phone = phone;
    user.email = email;
    user.gp = gp;
    user.isVerified = false;
    await user.save();
    // Send Verification Email
    await sendEmail({
      email,
      emailType: "VERIFY",
      userId: user._id,
      name,
    });
    return new Response(
      JSON.stringify({
        message: `User Profile Updated Successfully and Verification Email Sent`,
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
