import { sendReplyMail } from "../../../helpers/sendReplyMail";
export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { email, name, message, id, reply } = reqBody;

    await sendReplyMail({
      reply,
      id,
      message,
      email,
      name,
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
