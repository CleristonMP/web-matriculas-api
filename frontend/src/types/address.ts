import { Student } from "./student";

export type Address = {
    id?: number;
    publicPlace: string;
    number: string;
    complement: string;
    zipCode: number;
    district: string;
    countyId: number;
    students?: Student[];
}
