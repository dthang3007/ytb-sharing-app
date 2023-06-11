import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

export const PrivateRoute = ({ children }) => {
  const { auth } = useAuthStore();

  return auth?.accessToken ? children : <Navigate to="/" />;
};
