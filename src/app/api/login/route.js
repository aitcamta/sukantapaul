import dbConnect from "../../../lib/dbConnect";
import User from "../../../models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

dbConnect();

export const POST = async (request) => {
  try {
    const { email, password } = await request.json();
    const user = await User.findOne({ email });
    if (!user) {
      return new Response(
        JSON.stringify({
          message: "Invalid Email or Password",
          success: false,
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }

    if (user.isVerified) {
      if (user.isActive) {
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
          return new Response(
            JSON.stringify({
              message: "Invalid Email or Password",
              success: false,
            }),
            { status: 200, headers: { "Content-Type": "application/json" } }
          );
        }

        const tokenData = {
          id: user._id,
          username: user.username,
          email: user.email,
        };
        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET, {
          expiresIn: "1d",
        });

        const response = new Response(
          JSON.stringify({
            user,
            message: "Logged In Success",
            success: true,
          }),
          { status: 200, headers: { "Content-Type": "application/json" } }
        );
        response.headers.set(
          "Set-Cookie",
          `token=${token}; HttpOnly; Secure; Path=/; Max-Age=86400`
        );
        return response;
      } else {
        return new Response(
          JSON.stringify({
            message: "Account Blocked",
            success: false,
          }),
          { status: 200, headers: { "Content-Type": "application/json" } }
        );
      }
    } else {
      return new Response(
        JSON.stringify({
          message: "Please Verify Your Email or Password",
          success: false,
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: error.message,
        success: false,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  }
};
