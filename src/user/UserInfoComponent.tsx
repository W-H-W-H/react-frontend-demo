import { FC, useEffect, useState } from "react";
import { User } from "./User";
import { getUserInfoById } from "../api/User";

const UserInfoComponent : FC = () => {

    const [user, setUser] = useState<User|null>(null);

    useEffect(
        () => {
            getUserInfoById()
            .then((response)=>{
                setUser(response.data);
            })
            .catch((error)=>{

            });
        }
    ,[setUser]);

    return (
        <div className="mt-8">
            <div className="form">
                <h1 className="form-title">Your info</h1>
                <table className="w-full">
                    <tbody>
                    <tr>
                        <td className="w-4/12">
                            ID
                        </td>
                        <td className="form-input w-8/12">
                        {user?.id}
                        </td>
                    </tr>
                    <tr>
                        <td className="w-4/12">
                            Your Name
                        </td>
                        <td className="form-input w-8/12">
                            {user?.displayName}
                        </td>
                    </tr>
                    <tr>
                        <td className="w-4/12">
                            Email
                        </td>
                        <td className="form-input w-8/12">
                            {user?.email}
                        </td>
                    </tr>
                    <tr>
                        <td className="w-4/12">
                            Roles
                        </td>                   
                        <td className="form-input w-8/12">
                            {user?.roles.map(role => role.roleName).join(", ").toString()}
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default UserInfoComponent;