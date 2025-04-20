import { sendTextEmail } from "../../../helpers/sendTextEmail";
import { getRequestEmail } from "../../../helpers/getRequestEmail";
export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { email, name, message, id, address, url } = reqBody;

    await sendTextEmail({
      email,
      name,
      message,
      id,
    });
    await getRequestEmail({
      email,
      name,
      message,
      id,
      address,
      url,
    });
    return new Response(
      JSON.stringify({
        message: "Mail Sent, Please check your Email",
        success: true,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
