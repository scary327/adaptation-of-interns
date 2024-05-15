import { useContext } from "react"
import { UserInfoContext } from "../../RootApp";

export const UserProfile = () => {
    const { userInfo } = useContext(UserInfoContext);

    return (
        <div>
            this is user profile!!!

            Your role is {userInfo.role}
        </div>
    )
}