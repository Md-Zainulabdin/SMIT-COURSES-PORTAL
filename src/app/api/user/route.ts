import prismadb from "@/lib/prisma";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const { name, email, password, role } = await request.json();

  if ([name, email, password, role].some((feild) => feild.trim() === "")) {
    return new NextResponse("All feilds are required!");
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prismadb.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
      },
    });

    return NextResponse.json(user, {
      status: 201,
      statusText: "User created successfully",
    });
  } catch (error) {
    console.log("[USER-POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};
