import dbConnect from "../../../lib/dbConnect";
import User from "../../../models/user";

dbConnect();
export async function POST(request) {
  try {
    const reqBody = await request.json();

    const { id } = reqBody;

    const res = await User.deleteOne({ id });
    if (res.deletedCount === 0) {
      return new Response(
        JSON.stringify({ error: "User not found", success: false }),
        {
          status: 200,
        }
      );
    }
    return new Response(
      JSON.stringify({ message: "User deleted successfully", success: true }),
      {
        status: 200,
      }
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
