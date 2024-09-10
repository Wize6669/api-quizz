export interface Question {
  id?: number;
  statement: string;
  imageName?: string | null;
  justification?: string | null;
  answer: number;
  categoryId?: number | null;
  simulatorId?: string | null;
}
