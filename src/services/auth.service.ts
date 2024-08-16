import {PrismaClient} from '@prisma/client';
import {PrismaClientKnownRequestError} from '@prisma/client/runtime/library';
import bcrypt from 'bcryptjs';
import {User, UserAuth} from '../model/user';
import {ErrorMessage} from '../model/messages';

const prisma = new PrismaClient();

const signUpService = async (user: User): Promise<UserAuth | ErrorMessage> => {
  try {
    const existingUser = await prisma.user.findFirst({
      where: {
        email: user.email
      },
    });

    if(existingUser) {
      return { error: 'User already exists', code: 409 };
    }

    const hashedPassword = await bcrypt.hash(user.password, 10);

    const newUser = await prisma.user.create({
      data: {
        name: user.name,
        last_name: user.lastName,
        email: user.email,
        password: hashedPassword,
        roleId: user.roleId,
      }
    });

    return {
      id: user.id,
      name: newUser.name,
      lastName: newUser.last_name,
      email: newUser.email,
      roleId: newUser.roleId,
    };
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
    const fieldName = error.meta?.field_name;

    return { error: `Prisma\n Field name: ${fieldName} - Message: ${error.message}`, code: 400 };
    }

    return {error: 'Error occurred with the server', code: 500};
  }
}

const signInService = async (email:string, password: string): Promise<UserAuth | ErrorMessage> => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: email,
        delete: null,
      }
    });

    if(!user) {
      return {error: 'Invalid credentials', code: 400};
    }

    const isCorrectPassword = await bcrypt.compare(password, user.password);

    if(!isCorrectPassword) {
      return {error: 'Invalid credentials', code: 400};
    }

    return {
      id: user.id,
      name: user.name,
      lastName: user.last_name,
      email: user.email,
      changePassword: user.change_password,
      roleId: user.roleId,
    };
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {

      return {error: `Prisma: ${error.meta} - ${error.message}`, code: 400}
    }

    return {error: 'Error occurred with the server', code: 500};
  }
}

export { signUpService, signInService };
