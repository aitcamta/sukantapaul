import dbConnect from "../../../lib/dbConnect";
import User from "../../../models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

dbConnect();
export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    const user = await User.findOne({ email });
    if (!user) {
      const response = new Response(
        JSON.stringify({
          message: "Please Verify Your Email or Password",
          success: false,
        }),
        { status: 200 }
      );
      return response;
    }
    const verifiedUsser = user.isVerified;
    if (verifiedUsser) {
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        const response = new Response(
          JSON.stringify({
            message: "Please Verify Your Email or Password",
            success: false,
          }),
          { status: 200 }
        );
        return response;
      }

      const tokenData = {
        id: user._id,
        username: user.username,
        email: user.email,
      };
      const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET, {
        expiresIn: "1d",
      });
      const response = new Response(
        JSON.stringify({
          message: "Logged In Success",
          success: true,
        }),
        { status: 200 }
      );
      response.cookies.set("token", token, {
        httpOnly: true,
        secure: true,
      });
      return response;
    } else {
      const response = new Response(
        JSON.stringify({
          message: "Please Verify Your Email or Password",
          success: false,
        }),
        { status: 200 }
      );
      return response;
    }
  } catch (error) {
    const response = new Response(
      JSON.stringify({
        message: error.message,
        success: false,
      }),
      { status: 200 }
    );
    return response;
  }
}
