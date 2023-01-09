import { useContext, useEffect } from "react";
import { Navigate, NavLink, Outlet, useLocation } from "react-router-dom";
import AuthLoading from "../../Components/Loaders/AuthLoading";
import { UserContext } from "../../Context/UserContext";

const ProtectedRoute = () => {
  const { user, isLoading } = useContext(UserContext);
  const { pathname } = useLocation();

  useEffect(() => {
    console.log(user);
  }, [user]);

  if (pathname === "/create-user" && user?.name !== "Admin") {
    return <Navigate to="/login" state={{ from: pathname }} replace />;
  }
  if (pathname === "/create-anchor" && user?.name !== "Admin") {
    return <Navigate to="/login" state={{ from: pathname }} replace />;
  }
  if (pathname === "/create-agent" && user?.name !== "Admin") {
    return <Navigate to="/login" state={{ from: pathname }} replace />;
  }
  if (pathname === "/create-oem" && user?.name !== "Admin") {
    return <Navigate to="/login" state={{ from: pathname }} replace />;
  }

  if (isLoading) {
    return <AuthLoading />;
  }

  if (!user) {
    // return (
    //   <div className="unauthorized">
    //     <h1>Unauthorized :(</h1>
    //     <span>
    //       <NavLink to="/">Login</NavLink> to gain access
    //     </span>
    //   </div>
    // );
    return <Navigate to="/login" state={{ from: pathname }} replace />;
  }

  return <Outlet />;
};
export default ProtectedRoute;
