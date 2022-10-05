import { Address } from "./address";
import { Parent } from "./parent";
import { SchoolClass } from "./schoolClass";

export type Student = {
    id: number;
    enrollment: number;
    name: string;
    lastName: string;
    cpf: string;
    birthDate: string;
    address?: Address;
    schoolClass?: SchoolClass;
    parent?: Parent;
}
