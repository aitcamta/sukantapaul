import dbConnect from "../../../lib/dbConnect";
import Otp from "../../../models/otp";
dbConnect();
export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { email, code } = reqBody;

    let data = await Otp.findOne({ email, code });

    if (data) {
      let currentTime = new Date().getTime();
      let difference = data.expiresIn - currentTime;
      if (difference < 0) {
        return new Response(
          JSON.stringify({
            message: "OTP Expired",
            success: false,
            statusText: "error",
          }),
          { status: 200 }
        );
      } else {
        await Otp.deleteMany({ email });
        return new Response(
          JSON.stringify({
            message: "OTP Verified Successfully",
            success: true,
            statusText: "Success",
          }),
          { status: 200 }
        );
      }
    } else {
      return new Response(
        JSON.stringify({
          message: "Invalid OTP Code",
          success: false,
        }),
        { status: 200 }
      );
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
