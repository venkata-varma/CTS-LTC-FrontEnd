import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";

import Auth from "./pages/Auth/Auth";
import Dashboard from "./pages/Dashboard/Dashboard";
import Chequetrackingsystem from "./pages/Chequetrackingsystem";
import Loadstuffingcalculator from "./pages/Loadstuffingcalculator/Loadstuffingcalculator";
import Chequeworkflow from "./pages/Chequeworkflow/Chequeworkflow";
import Protectedroute from "./routes/Protectedroute";

import "react-toastify/dist/ReactToastify.css";

function App() {
  const accessToken = useSelector((state) => state.auth.accessToken);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/auth"
            element={
              accessToken ? <Navigate to="/dashboard" replace /> : <Auth />
            }
          />

          <Route element={<Protectedroute />}>
            <Route path="/dashboard" element={<Dashboard />} />

            <Route
              path="/cheque-tracking-system"
              element={<Chequetrackingsystem />}
            />
            <Route
              path="/cheque-tracking-system/:chequeId"
              element={<Chequeworkflow />}
            />
            <Route
              path="/load-and-stuffing-calculator"
              element={<Loadstuffingcalculator />}
            />
          </Route>

          <Route
            path="*"
            element={
              <Navigate to={accessToken ? "/dashboard" : "/auth"} replace />
            }
          />
        </Routes>
      </BrowserRouter>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
