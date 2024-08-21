import {PrismaClient} from "@prisma/client";
import {Simulator, SimulatorCreate} from "../model/simulator";
import {ErrorMessage, InfoMessage} from "../model/messages";
import bcrypt from "bcryptjs";
import {PrismaClientKnownRequestError} from "@prisma/client/runtime/library";
import {PaginationResponse} from "../model/pagination";
import {calculatePagination} from "../utils/pagination.util";

const prisma = new PrismaClient();

const createSimulatorService = async (simulator: Simulator): Promise<SimulatorCreate | ErrorMessage> => {
    try {
        const existingSimulator = await prisma.simulator.findFirst({
            where: {
                name: simulator.name
            },
        });
        if (existingSimulator) {
            return {error: 'Simulator already exists', code: 409};
        }

        const hashedPassword = await bcrypt.hash(simulator.password, 10);

        const newSimulator = await prisma.simulator.create({
            data: {
                name: simulator.name,
                password: hashedPassword,
                duration: simulator.duration,
                navigate: simulator.navigate,
                number_of_questions: 0,
                number_of_sections: 0,
            }
        });

        return {
            id: newSimulator.id,
            name: newSimulator.name,
            duration: newSimulator.duration,
            navigate: newSimulator.navigate,
            number_of_questions: newSimulator.number_of_questions,
            number_of_sections: newSimulator.number_of_sections,
        };
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            const fieldName = error.meta?.field_name;

            return {error: `Prisma\n Field name: ${fieldName} - Message: ${error.message}`, code: 400};
        }

        return {error: 'Error occurred with the server', code: 500};
    }
}

const updateSimulatorService = async (updateSimulator: Simulator): Promise<SimulatorCreate | ErrorMessage> => {
    try {
        const existingSimulator = await prisma.simulator.findFirst({
            where: {
                id: updateSimulator.id,
            },
        });

        if (!existingSimulator) {
            return {error: 'Simulator not found', code: 404};
        }

      const hashedPassword = updateSimulator.password
        ? await bcrypt.hash(updateSimulator.password, 10)
        : existingSimulator.password;

        const simulator = await prisma.simulator.update({
            where: {
                id: updateSimulator.id,
            },
            data: {
              name: updateSimulator.name,
              password: hashedPassword,
              duration: updateSimulator.duration,
              navigate: updateSimulator.navigate,
            }
        });

        return {
          id: simulator.id,
          name: simulator.name,
          duration: simulator.duration,
          navigate: simulator.navigate,
          number_of_questions: simulator.number_of_questions,
          number_of_sections: simulator.number_of_sections,
        };
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            const fieldName = error.meta?.field_name;

            return {error: `Prisma\n Field name: ${fieldName} - Message: ${error.message}`, code: 400};
        }

        console.log(error)
        return {error: 'Error occurred with the server', code: 500};
    }
}

const deleteSimulatorService = async (simulatorId: string): Promise<InfoMessage | ErrorMessage> => {
    try {
        const existingSimulator = await prisma.simulator.findFirst({
            where: {
                id: simulatorId,
            },
        });

        if (!existingSimulator) {
            return {error: 'Simulator not found', code: 404};
        }
        console.log(`Category found. Deleting category with ID: ${simulatorId}`);
        await prisma.simulator.delete({
            where: {
                id: simulatorId,
            }
        });

        console.log(`Category with ID: ${simulatorId} deleted successfully`);
        return {code: 204};
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            const fieldName = error.meta?.field_name;

            return {error: `Prisma\n Field name: ${fieldName} - Message: ${error.message}`, code: 400};
        }

        console.log(error)
        return {error: 'Error occurred with the server', code: 500};
    }
}

const simulatorListService = async (page: number = 1, count: number = 5): Promise<PaginationResponse<SimulatorCreate> | ErrorMessage> => {

    try {
        const total = await prisma.simulator.count();
        const paginationInfo = calculatePagination(page, count, total)

        const simulatorList = await prisma.simulator.findMany({
            skip: (page - 1) * count,
            take: count,
            select: {
              id: true,
              name: true,
              duration: true,
              navigate: true,
              number_of_questions: true,
              number_of_sections: true,
            },
            orderBy: [
                {name: 'asc'}
            ],
        });

        const data = simulatorList.map(simulator => ({
          id: simulator.id,
          name: simulator.name,
          duration: simulator.duration,
          navigate: simulator.navigate,
          number_of_questions: simulator.number_of_questions,
          number_of_sections: simulator.number_of_sections,
        }));

        const result: PaginationResponse<SimulatorCreate> = {
            ...paginationInfo,
            data,
        };

        return result
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            const fieldName = error.meta?.field_name;

            return {error: `Prisma\n Field name: ${fieldName} - Message: ${error.message}`, code: 400};
        }

        return {error: 'Error occurred with the server', code: 500};
    }
}

const getSimulatorByIdService = async (simulatorId: string): Promise<SimulatorCreate | ErrorMessage> => {
    try {
        const existingSimulator = await prisma.simulator.findFirst({
            where: {
                id: simulatorId
            },
        });

        if (!existingSimulator) {
            return {error: 'Simulator not found', code: 404};
        }

        return {
            name: existingSimulator.name,
            duration: existingSimulator.duration,
            navigate: existingSimulator.navigate,
            number_of_questions: existingSimulator.number_of_questions,
            number_of_sections: existingSimulator.number_of_sections,
        };
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            const fieldName = error.meta?.field_name;

            return {error: `Prisma\n Field name: ${fieldName} - Message: ${error.message}`, code: 400};
        }

        return {error: 'Error occurred with the server xd', code: 500};
    }
}

export {
    createSimulatorService,
    deleteSimulatorService,
    updateSimulatorService,
    simulatorListService,
    getSimulatorByIdService
}
