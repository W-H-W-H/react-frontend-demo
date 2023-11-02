enum Role{
    USER = "USER",
    MANAGER = "MANAGER",
    ADMIN = "ADMIN"
}

const roleNameMapper = (roleName : string) : Role => {
    switch(roleName){
        case "ROLE_MANAGER":
            return Role.MANAGER;
        case "ROLE_USER":
            return Role.USER
        case "ROLE_ADMIN":
            return Role.ADMIN;
        default: return Role.USER;
    }
}

export {Role, roleNameMapper};