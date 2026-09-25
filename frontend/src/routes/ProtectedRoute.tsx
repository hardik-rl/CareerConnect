// import { Navigate, Outlet } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// interface ProtectedRouteProps {
//   allowedRoles?: Array<"JOB_SEEKER" | "EMPLOYER" | "ADMIN">;
// }

// const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
//   const { isAuthenticated, user } = useAuth();
//   console.log(user, "user");

//   if (!isAuthenticated) {
//     return <Navigate to="/login" replace />;
//   }

//   if (allowedRoles && (!user || !allowedRoles.includes(user.role))) {
//     return <Navigate to="/" replace />;
//   }

//   return <Outlet />;
// };

// export default ProtectedRoute;

// import { Navigate, Outlet } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// interface ProtectedRouteProps {
//   allowedRoles?: Array<"JOB_SEEKER" | "EMPLOYER" | "ADMIN">;
// }

// const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
//   const { isAuthenticated, user, token } = useAuth();

//   console.log("AUTH CHECK:", {
//     isAuthenticated,
//     user,
//     role: user?.role,
//     token: !!token,
//     allowedRoles,
//   });

//   // Not logged in
//   if (!isAuthenticated || !token) {
//     console.log("REDIRECT → LOGIN");
//     return <Navigate to="/login" replace />;
//   }

//   // Logged in but role not allowed
//   if (allowedRoles && (!user || !allowedRoles.includes(user.role))) {
//     console.log("REDIRECT → HOME", {
//       userRole: user?.role,
//       allowedRoles,
//     });

//     return <Navigate to="/" replace />;
//   }

//   return <Outlet />;
// };

// export default ProtectedRoute;

import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface ProtectedRouteProps {
  allowedRoles?: Array<"JOB_SEEKER" | "EMPLOYER" | "ADMIN">;
}

const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const { isAuthenticated, user, token } = useAuth();

  console.log("PROTECTED ROUTE:", {
    isAuthenticated,
    user,
    token,
    role: user?.role,
    allowedRoles,
  });

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (
    allowedRoles &&
    (!user || !allowedRoles.includes(user.role))
  ) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;