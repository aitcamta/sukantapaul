import dbConnect from "../../../lib/dbConnect";
import User from "../../../models/user";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "../../../helpers/getDataFromToken";
dbConnect();
export async function POST(request: NextRequest) {
  // extract data from token
  try {
    const userId = await getDataFromToken(request);
    const user = await User.findOne({ _id: userId }).select("-password");
    // check if there is no user
    return NextResponse.json(
      { message: "User Found", data: user },
      { status: 200 }
    );
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      {
        message: error.message,
        success: false,
      },
      { status: 200 }
    );
  }
}
