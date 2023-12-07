import { Role } from "./Role.model";


export interface Users {
    id:number;
    fullName:string;
    username:string;
    Email:string;
    role:Role;
    Password:string;
    action:string;
}