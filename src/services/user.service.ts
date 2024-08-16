import {PrismaClient} from '@prisma/client';
import {PrismaClientKnownRequestError} from '@prisma/client/runtime/library';
import bcrypt from 'bcryptjs';
import {UserChangePassword} from '../model/user';
import {ErrorMessage} from '../model/errorMessage';

const prisma = new PrismaClient();

const changePasswordService = async (email:string, newPassword: string): Promise<UserChangePassword | ErrorMessage> => {
    try {
      const existingUser = await prisma.user.findFirst({
        where: {
          email: email,
          delete: null,
          change_password:true
        },
      });

      if(!existingUser) {
        return { error: 'User not found', code: 404 };
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);

      const user = await prisma.user.update({
        where: {
          email: email
        },
        data: {
          password: hashedPassword,
          change_password:false
        }
      });

    return {
        id: user.id
      };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
      const fieldName = error.meta?.field_name;

      return { error: `Prisma\n Field name: ${fieldName} - Message: ${error.message}`, code: 400 };
      }

      return {error: 'Error occurred with the server', code: 500};
    }
  }

  export { changePasswordService }
