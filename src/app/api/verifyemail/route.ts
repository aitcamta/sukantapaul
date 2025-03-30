import dbConnect from "../../../lib/dbConnect";
import User from "../../../models/user";
import { NextRequest, NextResponse } from "next/server";

dbConnect();
export async function POST(request: NextRequest, response: NextResponse) {
  try {
    const reqBody = await request.json();

    const { token } = reqBody;
    console.log(token);
    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });
    if (!user) {
      return NextResponse.json(
        { error: "Invalid Token Details" },
        { status: 400 }
      );
    }
    console.log(user);
    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;
    await user.save();
    return NextResponse.json({
      message: "Email Verified Successfully",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
