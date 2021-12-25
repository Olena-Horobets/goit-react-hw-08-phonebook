import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function PrivateRoute({ children, navigateTo }) {
  const isLoggedIn = useSelector(state => state.isLoggedIn);

  return isLoggedIn ? children : <Navigate to={navigateTo} exact />;
}

export { PrivateRoute };
