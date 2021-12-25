import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function PublicRoute({ children, restricted, navigateTo = '/' }) {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  return !isLoggedIn && restricted ? children : <Navigate to={navigateTo} />;
}

export { PublicRoute };
