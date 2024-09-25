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
