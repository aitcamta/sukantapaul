import dbConnect from "../../../lib/dbConnect";
import Users from "../../../models/user";

dbConnect();
export async function POST(request) {
  try {
    const userData = await Users.find();
    if (userData) {
      return new Response(
        JSON.stringify({
          message: "Here is the users",
          success: true,
          data: userData,
        }),
        { status: 200 }
      );
    } else {
      return new Response(
        JSON.stringify({
          message: "Cannot Find any user",
          success: false,
        }),
        { status: 200 }
      );
    }
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: error.message,
        message: "Something went wrong",
        success: false,
      }),
      {
        status: 200,
      }
    );
  }
}
