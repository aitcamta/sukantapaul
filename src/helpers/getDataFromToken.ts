import { NextRequest, NextResponse } from "next/server";

import jwt from "jsonwebtoken";

export const getDataFromToken = (request: NextRequest) => {
  // extract data from token
  try {
    const token = request.cookies.get("token")?.value || "";
    if (token) {
      let verifyToken: any = jwt.verify(token, process.env.TOKEN_SECRET!);
      return verifyToken.id;
    } else {
      return null;
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
};
