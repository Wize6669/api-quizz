export interface Simulator{
  id?: string;
  name: string;
  password: string;
  duration: number;
  navigate: boolean;
  number_of_questions?: number;
  number_of_sections?: number;
}

export interface SimulatorCreate extends Omit<Simulator, 'password'> {}
