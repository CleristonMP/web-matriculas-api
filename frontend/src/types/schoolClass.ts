import { Student } from "./student";

export type SchoolClass = {
    id: number;
    name: string;
    period: string;
    students: Student[];
}
