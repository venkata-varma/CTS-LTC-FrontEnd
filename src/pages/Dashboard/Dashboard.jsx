import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  logoutUser,
} from "../../redux/features/auth/authSlice";

import "./Dashboard.css";

function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector(
    (state) => state.auth.user,
  );

  const handleLogout = () => {
    dispatch(logoutUser());

    navigate("/auth", {
      replace: true,
    });
  };

  return (
    <main className="dashboard-page">
      <section className="dashboard-container">
        <header className="dashboard-header">
          <div>
            <h1>Sahara Industries</h1>

            <p>
              Welcome
              {user?.userName
                ? `, ${user.userName}`
                : ""}
            </p>
          </div>

          <button
            type="button"
            className="dashboard-logout-button"
            onClick={handleLogout}
          >
            Logout
          </button>
        </header>

        <div className="dashboard-content">
          <h2>Select a system</h2>

          <div className="dashboard-cards">
            <button
              type="button"
              className="dashboard-card"
              onClick={() =>
                navigate("/cheque-tracking-system")
              }
            >
              <h3>Cheque Tracking System</h3>

              <p>
                Register, review and track received
                cheques.
              </p>
            </button>

            <button
              type="button"
              className="dashboard-card"
              onClick={() =>
                navigate(
                  "/load-and-stuffing-calculator",
                )
              }
            >
              <h3>Load & Stuffing Calculator</h3>

              <p>
                Configure products, vehicles and cargo
                loading plans.
              </p>
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Dashboard;