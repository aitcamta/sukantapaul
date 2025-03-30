import dbConnect from "../../../lib/dbConnect";
import User from "../../../models/user";
import { getDataFromToken } from "../../../helpers/getDataFromToken";

dbConnect();

export const POST = async (request) => {
  try {
    // Extract data from token
    const userId = await getDataFromToken(request);

    // Ensure userId is a valid ObjectId
    const mongoose = require("mongoose");
    const validUserId = new mongoose.Types.ObjectId(userId);

    const user = await User.findOne({ _id: validUserId }).select("-password");

    if (!user) {
      // Return response if no user is found
      return new Response(
        JSON.stringify({ message: "User not found", success: false }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    // Return response if user is found
    return new Response(
      JSON.stringify({ message: "User Found", data: user }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ message: error.message, success: false }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};