export interface Simulator{
  id?: string;
  name: string;
  password: string;
  duration: number;
  navigate: boolean;
  number_questions?: number;
}

export interface SimulatorList extends Omit<Simulator, 'number_questions' | 'navigate'> {}
