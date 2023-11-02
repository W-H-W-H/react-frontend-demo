import { Role } from "./Roles";

export interface UserDetails {
    userEmail: string;
    roles: Role[];
}
