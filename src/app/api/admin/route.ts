import prismadb from "@/lib/prisma";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const { name, email, password, role, avatar } = await request.json();

  if (
    [name, email, password, role, avatar].some((feild) => feild.trim() === "")
  ) {
    return new NextResponse("All feilds are required!");
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await prismadb.admin.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
        avatar,
      },
    });

    return NextResponse.json(admin, {
      status: 201,
      statusText: "Admin created successfully",
    });
  } catch (error) {
    console.log("[ADMIN-POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};
