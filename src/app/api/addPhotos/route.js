import dbConnect from "../../../lib/dbConnect";
import Member from "../../../models/member";
import { NextResponse } from "next/server";

dbConnect();

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { date, id, fileName, fileType, addedBy, url, description, title } =
      reqBody;

    const newPhoto = new Member({
      date,
      id,
      fileName,
      fileType,
      addedBy,
      url,
      description,
      title,
    });
    const savePhoto = await newPhoto.save();

    return NextResponse.json(
      {
        message: "Photo saved successfully",
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Photo saving failed",
        success: false,
      },
      { status: 200 }
    );
  }
}
