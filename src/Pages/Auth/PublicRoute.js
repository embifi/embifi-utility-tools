import { useContext, useEffect, useState } from "react";
import { Navigate, NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import AuthLoading from "../../Components/Loaders/AuthLoading";

const PublicRoute = () => {
  const { user, isLoading } = useContext(UserContext);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const location = useLocation()

  const [path, setPath] = useState("/")

  useEffect(()=>{
    if(location?.state?.from){
      setPath(location?.state?.from)
    }
  },[location])

  if (isLoading) {
    return <AuthLoading />;
  }

  // show unauthorized screen if no user is found in redux store
  if (user) {
    return <Navigate to={path} state={{ from: pathname }} replace />;
  }

  // returns child route elements
  return <Outlet />;
};
export default PublicRoute;
