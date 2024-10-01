import { PrismaClient } from "@prisma/client";
import { QuestionCreate } from "../model/question";
import { ErrorMessage } from "../model/messages";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

const prisma = new PrismaClient();

const createQuestionService = async (question: QuestionCreate): Promise<QuestionCreate | ErrorMessage> => {
  try {
    const newQuestion = await prisma.question.create({
      data: {
        statement: question.statement,
        imageName: question.imageName || undefined,
        justification: question.justification,
        answer: question.answer,
        categoryId: question.categoryId,
        simulatorId: question.simulatorId,
        options: {
          create: question.options.map(option => ({
            statement: option.statement,
            imageName: option.imageName
          }))
        }
      },
      include: {
        options: true
      }
    });

    // Si la pregunta está asociada a un simulador, actualizamos el número de preguntas
    if (question.simulatorId) {
      await prisma.simulator.update({
        where: { id: question.simulatorId },
        data: { number_of_questions: { increment: 1 } }
      });
    }

    return {
      id: newQuestion.id,
      statement: newQuestion.statement,
      imageName: newQuestion.imageName || undefined,
      justification: newQuestion.justification || undefined,
      answer: newQuestion.answer,
      options: newQuestion.options,
      categoryId: newQuestion.categoryId || undefined,
      simulatorId: newQuestion.simulatorId || undefined
    };
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      const fieldName = error.meta?.target;
      return { error: `Prisma: Campo: ${fieldName} - Mensaje: ${error.message}`, code: 400 };
    }
    return { error: 'Ocurrió un error en el servidor', code: 500 };
  }
};
export { createQuestionService }
