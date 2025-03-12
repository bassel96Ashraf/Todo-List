import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const password = params?.slug;

    if (!password) {
      return NextResponse.json(
        { message: "Password query param is required" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const uuid = uuidv4();

    return NextResponse.json({
      uuid,
      hashedPassword,
      password,
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      {
        message: "Error generating hashed password",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
