import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  loginUserApi,
  registerUserApi,
} from "./authApi";

const storedToken = localStorage.getItem("accessToken");
const storedUser = localStorage.getItem("authUser");

const initialState = {
  user: storedUser ? JSON.parse(storedUser) : null,
  accessToken: storedToken || null,

  registrationLoading: false,
  loginLoading: false,

  registrationError: null,
  loginError: null,

  registrationMessage: null,
  loginMessage: null,
};

const getErrorMessage = (error, fallbackMessage) => {
  return (
    error.response?.data?.message ||
    error.message ||
    fallbackMessage
  );
};

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      return await registerUserApi(userData);
    } catch (error) {
      return rejectWithValue(
        getErrorMessage(error, "Registration failed."),
      );
    }
  },
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (loginData, { rejectWithValue }) => {
    try {
      return await loginUserApi(loginData);
    } catch (error) {
      return rejectWithValue(
        getErrorMessage(error, "Login failed."),
      );
    }
  },
);

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    logoutUser: (state) => {
      state.user = null;
      state.accessToken = null;
      state.loginMessage = null;
      state.loginError = null;

      localStorage.removeItem("accessToken");
      localStorage.removeItem("authUser");
    },

    clearAuthMessages: (state) => {
      state.registrationMessage = null;
      state.loginMessage = null;
      state.registrationError = null;
      state.loginError = null;
    },
  },

  extraReducers: (builder) => {
    builder
      // Registration
      .addCase(registerUser.pending, (state) => {
        state.registrationLoading = true;
        state.registrationError = null;
        state.registrationMessage = null;
      })

      .addCase(registerUser.fulfilled, (state, action) => {
        state.registrationLoading = false;
        state.registrationMessage =
          action.payload?.message ||
          "User registered successfully.";
      })

      .addCase(registerUser.rejected, (state, action) => {
        state.registrationLoading = false;
        state.registrationError =
          action.payload || "Registration failed.";
      })

      // Login
      .addCase(loginUser.pending, (state) => {
        state.loginLoading = true;
        state.loginError = null;
        state.loginMessage = null;
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        state.loginLoading = false;

        const responseData = action.payload?.data;

        const accessToken = responseData?.authToken;

        const user = {
          userId: responseData?.userId,
          userName: responseData?.userName,
        };

        state.accessToken = accessToken;
        state.user = user;
        state.loginMessage =
          action.payload?.message || "Login successful.";

        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem(
          "authUser",
          JSON.stringify(user),
        );
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.loginLoading = false;
        state.loginError =
          action.payload || "Login failed.";
      });
  },
});

export const {
  logoutUser,
  clearAuthMessages,
} = authSlice.actions;

export default authSlice.reducer;