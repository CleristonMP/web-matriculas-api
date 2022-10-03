import { Student } from "./student";

export type schoolClass = {
    id: number;
    name: string;
    period: string;
    students: Student[];
}
