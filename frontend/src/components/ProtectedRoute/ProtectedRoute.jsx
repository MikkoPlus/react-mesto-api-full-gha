import { Navigate } from "react-router-dom";

const ProtectedRouteElement = ({ element: Component, loggedIn, ...props }) => {
  return loggedIn ? <Component {...props} /> : <Navigate to="/sign-in" replace />;
};

export default ProtectedRouteElement;
