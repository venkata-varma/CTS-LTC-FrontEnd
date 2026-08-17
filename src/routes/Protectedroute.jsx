import { useSelector } from "react-redux";
import {
  Navigate,
  Outlet,
  useLocation,
} from "react-router-dom";

function Protectedroute() {
  const accessToken = useSelector(
    (state) => state.auth.accessToken,
  );

  const location = useLocation();

  if (!accessToken) {
    return (
      <Navigate
        to="/auth"
        replace
        state={{
          from: location.pathname,
        }}
      />
    );
  }

  return <Outlet />;
}

export default Protectedroute;