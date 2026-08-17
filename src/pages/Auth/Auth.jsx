import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {
  loginUser,
  registerUser,
} from "../../redux/features/auth/authSlice";

import "./Auth.css";

const initialRegisterForm = {
  userName: "",
  userEmail: "",
  userPassword: "",
  userRole: "Member",
};

const initialLoginForm = {
  userEmail: "",
  userPassword: "",
};

function Auth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    registrationLoading,
    loginLoading,
  } = useSelector((state) => state.auth);

  const [registerForm, setRegisterForm] =
    useState(initialRegisterForm);

  const [loginForm, setLoginForm] =
    useState(initialLoginForm);

  const handleRegisterChange = (event) => {
    const { name, value } = event.target;

    setRegisterForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleLoginChange = (event) => {
    const { name, value } = event.target;

    setLoginForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleRegisterSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await dispatch(
        registerUser(registerForm),
      ).unwrap();

      toast.success(
        response?.message ||
          "User registered successfully.",
      );

      setRegisterForm(initialRegisterForm);
    } catch (error) {
      toast.error(
        typeof error === "string"
          ? error
          : "Registration failed.",
      );
    }
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await dispatch(
        loginUser(loginForm),
      ).unwrap();

      toast.success(
        response?.message || "Login successful.",
      );

      setLoginForm(initialLoginForm);

      navigate("/dashboard", {
        replace: true,
      });
    } catch (error) {
      toast.error(
        typeof error === "string"
          ? error
          : "Login failed.",
      );
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-card">
        <div className="auth-heading">
          <h1>Sahara Industries</h1>

          <p>
            Register a new account or log in to continue.
          </p>
        </div>

        <div className="auth-forms">
          <form
            className="auth-form register-form"
            onSubmit={handleRegisterSubmit}
          >
            <h2>Register</h2>

            <div className="auth-field">
              <label htmlFor="register-user-name">
                User Name
              </label>

              <input
                id="register-user-name"
                type="text"
                name="userName"
                value={registerForm.userName}
                onChange={handleRegisterChange}
                required
              />
            </div>

            <div className="auth-field">
              <label htmlFor="register-email">
                Email
              </label>

              <input
                id="register-email"
                type="email"
                name="userEmail"
                value={registerForm.userEmail}
                onChange={handleRegisterChange}
                required
              />
            </div>

            <div className="auth-field">
              <label htmlFor="register-password">
                Password
              </label>

              <input
                id="register-password"
                type="password"
                name="userPassword"
                value={registerForm.userPassword}
                onChange={handleRegisterChange}
                required
              />
            </div>

            <div className="auth-field">
              <label htmlFor="register-role">
                Role
              </label>

              <select
                id="register-role"
                name="userRole"
                value={registerForm.userRole}
                onChange={handleRegisterChange}
              >
                <option value="Member">Member</option>
                <option value="Admin">Admin</option>
              </select>
            </div>

            <button
              type="submit"
              className="auth-submit-button"
              disabled={registrationLoading}
            >
              {registrationLoading
                ? "Registering..."
                : "Register"}
            </button>
          </form>

          <div
            className="auth-divider"
            aria-hidden="true"
          />

          <form
            className="auth-form login-form"
            onSubmit={handleLoginSubmit}
          >
            <h2>Login</h2>

            <div className="auth-field">
              <label htmlFor="login-email">
                Email
              </label>

              <input
                id="login-email"
                type="email"
                name="userEmail"
                value={loginForm.userEmail}
                onChange={handleLoginChange}
                required
              />
            </div>

            <div className="auth-field">
              <label htmlFor="login-password">
                Password
              </label>

              <input
                id="login-password"
                type="password"
                name="userPassword"
                value={loginForm.userPassword}
                onChange={handleLoginChange}
                required
              />
            </div>

            <button
              type="submit"
              className="auth-submit-button"
              disabled={loginLoading}
            >
              {loginLoading
                ? "Logging in..."
                : "Login"}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}

export default Auth;