import prismadb from "@/lib/prisma";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const { name, email, password, role } = await req.json();

  if ([name, email, password, role].some((feild) => feild.trim() === "")) {
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
        avatar: "",
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

export const PATCH = async (req: Request) => {
  const { name, email, password, avatar } = await req.json();

  if ([name, email, password, avatar].some((feild) => feild.trim() === "")) {
    return new NextResponse("All feilds are required!");
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await prismadb.admin.update({
      where: {
        name: name || "",
        id: "hioio"
      },
      data: {
        name,
        email,
        password,
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
