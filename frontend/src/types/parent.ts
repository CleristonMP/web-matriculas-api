import { Student } from "./student";

export type Parent = {
  id?: number;
  name: string;
  lastName: string;
  cpf: string;
  phone: string;
  students?: Student[];
};
