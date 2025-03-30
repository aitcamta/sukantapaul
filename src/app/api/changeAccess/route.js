import dbConnect from "../../../lib/dbConnect";
import User from "../../../models/user";

dbConnect();
export async function POST(request) {
  try {
    const reqBody = await request.json();

    const { id, isAdmin } = reqBody;
    const user = await User.findOne({
      id,
    });
    if (!user) {
      return new Response(
        JSON.stringify({ error: "Invalid User Details", success: false }),
        {
          status: 400,
        }
      );
    }

    user.isAdmin = isAdmin;

    await user.save();
    return new Response(
      JSON.stringify({
        message: `Access Changed to ${isAdmin ? "Admin" : "User"} Successfully`,
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
