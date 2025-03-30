import dbConnect from "../../../lib/dbConnect";
import User from "../../../models/user";

dbConnect();
export async function POST(request) {
  try {
    const reqBody = await request.json();

    const { token } = reqBody;
    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });
    if (!user) {
      return new Response(
        JSON.stringify({ error: "Invalid Token Details", success: false }),
        {
          status: 400,
        }
      );
    }
    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;
    await user.save();
    return new Response(
      JSON.stringify({
        message: "Email Verified Successfully",
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
