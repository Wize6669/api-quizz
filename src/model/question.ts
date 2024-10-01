export interface Question {
  id?: number;
  statement: string;
  imageName?: string | null;
  justification?: string | null;
  answer: number;
  categoryId?: number | null;
  simulatorId?: string | null;
}

export interface QuestionCreate {
  id: number;
  statement: string;
  imageName?: string;
  justification?: string;
  answer: number;
  options: {
    id: number;
    statement: string;
    imageName?: string | null;
  }[];
  categoryId?: number;
  simulatorId?: string;
}

export interface Option {
  statement: string;
  imageName?: string;
}
