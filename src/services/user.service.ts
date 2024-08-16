import { PrismaClient } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import bcrypt from 'bcryptjs';
import { UserChangePassword, UserPagination } from '../model/user';
import { PaginationResponse } from '../model/pagination';
import { ErrorMessage } from '../model/errorMessage';
import { calculatePagination } from '../utils/pagination.util';

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

  const userListService = async (page: number = 1, count: number = 5): Promise<PaginationResponse<UserPagination> | ErrorMessage> => {
    try {
      const total = await prisma.user.count();
      const paginationInfo = calculatePagination(page, count, total)

      const userList = await prisma.user.findMany({
        skip: (page - 1) * count,
        take: count,
        select: {
          id: true,
          name: true,
          last_name: true,
          email: true,
          password: false,
          delete: true,
          change_password: true,
          role: {
            select: {
              title: true,
            },
          },
        },
        orderBy: [
          { name: 'asc' },
          { last_name: 'asc' },
        ],
      });
      
      const data = userList.map(user => ({
        id: user.id,
        name: user.name,
        lastName: user.last_name,
        email: user.email,
        delete: user.delete,
        changePassword: user.change_password,
        role: user.role.title,
    }));

    const result: PaginationResponse<UserPagination> = {
        ...paginationInfo,
        data,
    };

    return result;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
      const fieldName = error.meta?.field_name;

      return { error: `Prisma\n Field name: ${fieldName} - Message: ${error.message}`, code: 400 };
      }

      return {error: 'Error occurred with the server', code: 500};
    }
  }

  export { changePasswordService, userListService }
