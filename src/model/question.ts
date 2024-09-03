export interface Question {
  id?: number;
  text: string;
  imageUrl?: string | null;
  justification?: string | null;
  answer: number;
  categoryId?: number | null;
  simulatorId?: string | null;
}
