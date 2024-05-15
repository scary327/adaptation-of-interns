import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { UserInfoContext } from '../../RootApp';

const RequireAuth = ({ children }) => {
  const { userInfo } = useContext(UserInfoContext);

  const location = useLocation();

  if (userInfo.id) {
    return <Navigate to='/' state={{ from: location}} />
  }

  return children;
};

export default RequireAuth;