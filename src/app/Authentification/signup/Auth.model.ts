import {Role} from '../../common/Role.model';

export interface Auth { 
    id:number;
    fullName:string;
    username:string;
    Email:string;
    role:Role;
    Password:string;
}
