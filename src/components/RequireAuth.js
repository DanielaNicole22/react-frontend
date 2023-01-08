import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

/**
 * Require Authentication component
 */
const RequireAuth = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const location = useLocation(); 

    return (
      isLoggedIn ? <Outlet/> : <Navigate to="/login" state={{from: location}} replace />
    )
}

export default RequireAuth