import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserInfoContext } from "../../RootApp";

function RequireAuth({ children }) {
  const { userInfo } = useContext(UserInfoContext);

  if (!userInfo) {
    return <Navigate to="/" />;
  }

  return children;
}

export default RequireAuth;