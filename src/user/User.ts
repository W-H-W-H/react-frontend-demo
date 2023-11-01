export interface User {
    id : number,
    email: string,
    displayName : string,
    isEnabled : boolean,
    roles: {
        roleId : string,
        roleName : string
    }[]
}