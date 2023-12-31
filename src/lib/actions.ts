import prismadb from "./prisma";

interface IUser {
  id: string;
  name: string;
  role: string;
  email: string;
  created_at: Date;
  password: string;
}

export const findUserByEmail = async (email: string) => {
  const allUsers = await prismadb.user.findMany({});

  const user = allUsers.find((user) => user.email == email);

  if (!user) {
    return null;
  }

  return user;
};

export const findAdminByEmail = async (email: string) => {
  const allAdmins = await prismadb.admin.findMany({});

  const admin = allAdmins.find((admin) => admin.email == email);

  if (!admin) {
    return null;
  }

  return admin;
};
