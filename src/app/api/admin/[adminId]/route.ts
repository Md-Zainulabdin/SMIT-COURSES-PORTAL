import prismadb from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (
  request: NextRequest,
  { params }: { params: { adminId: string } }
) => {
  const { name, email, avatar } = await request.json();

  if ([name, email, avatar].some((feild) => feild.trim() === "")) {
    return new NextResponse("All feilds are required!");
  }

  try {
    const admin = await prismadb.admin.update({
      where: {
        id: params.adminId,
      },
      data: {
        name,
        email,
        avatar,
      },
    });

    return NextResponse.json(admin, {
      status: 201,
      statusText: "Admin Updated successfully",
    });
  } catch (error) {
    console.log("[ADMIN-PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};

export const POST = async (
  request: NextRequest,
  { params }: { params: { adminId: string } }
) => {
  // verify admin with a secret key

  const { key } = await request.json();

  if (!key) {
    return new NextResponse("Key is required!");
  }

  if (!params.adminId) {
    return new NextResponse("Admin Id is required!");
  }

  try {
    const secretKey = process.env.ADMIN_SECRET_KEY;

    if (key !== secretKey) {
      return NextResponse.json({
        authentication: false,
        message: "Wrong Admin key",
      });
    }

    return NextResponse.json({
      authentication: true,
    });
  } catch (error) {
    console.log("[ADMIN-KEY]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};
