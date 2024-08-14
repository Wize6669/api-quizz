import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const signUpService = async (name: string, lastName: string, email:string, password: string, roleId: number) => {
  try {
    const userExist = await prisma.user.findFirst({
      where: {
        email: email,
      }
    });

    if(userExist) {
      return {error: "User already exists"};
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    return await prisma.user.create({
      data: {
        name: name,
        last_name: lastName,
        email: email,
        password: hashedPassword,
        roleId: roleId,
      }
    });
  } catch (e) {
    return {error: "Error occurred with the server"};
  }
}

export { signUpService };
