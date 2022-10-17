import { Student } from "./student";

export type Period = {
  id: number;
  name: string;
};

export type SchoolClass = {
  id: number;
  name: string;
  period: Period;
  students: Student[];
};
