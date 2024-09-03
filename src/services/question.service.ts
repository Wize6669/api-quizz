import {PrismaClient} from "@prisma/client";
import {Question} from "../model/question";
import {ErrorMessage} from "../model/messages";
import {PrismaClientKnownRequestError} from "@prisma/client/runtime/library";

const prisma = new PrismaClient();

const createQuestionService = async (question: Question, file?: Express.Multer.File): Promise<Question | ErrorMessage> => {
  try{
    const existingQuestion = await prisma.question.findFirst({
      where: {
        id: question.id,
      },
    });
    if (existingQuestion) {
      return {error: 'Question already exists', code: 409};
    }

    // Procesa la imagen si está presente
    let imageUrl: string | null = null;
    if (file) {
      imageUrl = file.path; // Guardar la ruta de la imagen
    }

    const newQuestion = await prisma.question.create({
      data: {
        text: question.text,
        imageUrl: imageUrl,
        justification: question.justification ?? null,
        answer: question.answer,
        categoryId: question.categoryId ?? null,
        simulatorId: question.simulatorId ?? null,
      }
    });

    return {
      id: newQuestion.id,
      text: newQuestion.text,
      imageUrl: newQuestion.imageUrl,
      justification: newQuestion.justification,
      answer: newQuestion.answer,
      categoryId: newQuestion.categoryId,
      simulatorId: newQuestion.simulatorId,
    };
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      const fieldName = error.meta?.field_name;

      return {error: `Prisma\n Field name: ${fieldName} - Message: ${error.message}`, code: 400};
    }

    return {error: 'Error occurred with the server', code: 500};
  }
}

export { createQuestionService }
