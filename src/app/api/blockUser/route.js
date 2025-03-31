import dbConnect from "../../../lib/dbConnect";
import User from "../../../models/user";

dbConnect();
export async function POST(request) {
  try {
    const reqBody = await request.json();

    const { id, isActive } = reqBody;
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

    user.isActive = isActive;
    console.log(user);
    await user.save();
    return new Response(
      JSON.stringify({
        message: `User ${isActive ? "Unblocked" : "Blocked"} Successfully`,
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
