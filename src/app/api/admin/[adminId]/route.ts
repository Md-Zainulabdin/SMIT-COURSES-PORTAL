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
