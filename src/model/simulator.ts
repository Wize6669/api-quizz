export interface Simulator{
  id?: string;
  name: string;
  password: string;
  duration: number;
  visibility: boolean;
  navigate: boolean;
  number_of_questions?: number;
}

export interface SimulatorCreate extends Omit<Simulator, 'password'> {}

/*export interface SimulatorCreate {
  id: string;
  name: string;
  duration: number;
  visibility: boolean;
  navigate: boolean;
  number_of_questions: number;
  questions: {
    id: number;
    statement: string;
    imageName?: string;
    justification?: string;
    answer: number;
    options: {
      id: number;
      statement: string;
      imageName?: string;
    }[];
    categoryId?: number;
  }[];
}
*/
