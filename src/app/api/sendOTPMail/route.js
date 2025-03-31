import dbConnect from "../../../lib/dbConnect";
import {sendOTP} from "../../../helpers/otpMailer";
import Otp from "../../../models/otp";
import User from "../../../models/user";
dbConnect();
function generateOTP() {
  // Generate a random number between 100000 and 999999
  let otp = Math.floor(100000 + Math.random() * 900000);
  return otp.toString(); // Convert it to string if you need the OTP as a string
}
export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { email } = reqBody;
    const data = await User.findOne({ email });

    const name = data.name;

    if (data) {
      const otp = generateOTP();
      await Otp.create({
        email: email,
        code: otp,
        expiresIn: new Date().getTime() + 300 * 1000,
      });
      await sendOTP({
        email,
        code: otp,
        name,
      });

      return new Response(
        JSON.stringify({
          message: "OTP Sent, Please check your Email",
          success: true,
        }),
        { status: 200 }
      );
    } else {
      return new Response(
        JSON.stringify({
          message: "User Not Found",
          success: false,
        }),
        { status: 400 }
      );
    }
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
