import dbConnect from "../../../lib/dbConnect";
import { sendOTP } from "../../../helpers/otpMailer";
import Otp from "../../../models/otp";
dbConnect();
function generateOTP() {
  // Generate a random number between 100000 and 999999
  let otp = Math.floor(100000 + Math.random() * 900000);
  return otp.toString(); // Convert it to string if you need the OTP as a string
}
export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { email, name } = reqBody;

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
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
