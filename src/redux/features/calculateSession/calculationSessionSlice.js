import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

import {
  getAllSessionsOfUserApi,
  reactivateSessionApi,
  saveAndStartNewSessionApi,
  startNewSessionApi,
} from "./calculationSessionApi";

const initialState = {
  currentSession: null,
  allSessions: [],

  loading: false,
  reactivatingSessionId: null,

  error: null,
  message: null,
};

const getErrorMessage = (error, fallbackMessage) => {
  return (
    error.response?.data?.message ||
    error.message ||
    fallbackMessage
  );
};

export const startNewSession = createAsyncThunk(
  "calculationSession/startNewSession",
  async (_, { rejectWithValue }) => {
    try {
      return await startNewSessionApi();
    } catch (error) {
      return rejectWithValue(
        getErrorMessage(
          error,
          "Unable to start a new session.",
        ),
      );
    }
  },
);

export const saveAndStartNewSession = createAsyncThunk(
  "calculationSession/saveAndStartNewSession",
  async (calculationSessionId, { rejectWithValue }) => {
    try {
      return await saveAndStartNewSessionApi(
        calculationSessionId,
      );
    } catch (error) {
      return rejectWithValue(
        getErrorMessage(
          error,
          "Unable to save the current session.",
        ),
      );
    }
  },
);

export const getAllSessionsOfUser = createAsyncThunk(
  "calculationSession/getAllSessionsOfUser",
  async (_, { rejectWithValue }) => {
    try {
      return await getAllSessionsOfUserApi();
    } catch (error) {
      return rejectWithValue(
        getErrorMessage(
          error,
          "Unable to retrieve sessions.",
        ),
      );
    }
  },
);

export const reactivateSession = createAsyncThunk(
  "calculationSession/reactivateSession",
  async (sessionIds, { rejectWithValue }) => {
    try {
      return await reactivateSessionApi(sessionIds);
    } catch (error) {
      return rejectWithValue(
        getErrorMessage(
          error,
          "Unable to reactivate the requested session.",
        ),
      );
    }
  },
);

const calculationSessionSlice = createSlice({
  name: "calculationSession",

  initialState,

  reducers: {
    clearCalculationSessionMessage: (state) => {
      state.message = null;
      state.error = null;
    },

    clearCurrentSession: (state) => {
      state.currentSession = null;
    },
  },

  extraReducers: (builder) => {
    builder
      // Start session
      .addCase(startNewSession.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })

      .addCase(startNewSession.fulfilled, (state, action) => {
        state.loading = false;

        const newSession =
          action.payload?.data
            ?.createNewcalculationSession;

        state.currentSession = newSession || null;
        state.message = action.payload?.message || null;

        if (newSession) {
          state.allSessions = [
            newSession,
            ...state.allSessions.filter(
              (session) =>
                session._id !== newSession._id,
            ),
          ];
        }
      })

      .addCase(startNewSession.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload ||
          "Unable to start a new session.";
      })

      // Save current and start new
      .addCase(
        saveAndStartNewSession.pending,
        (state) => {
          state.loading = true;
          state.error = null;
          state.message = null;
        },
      )

      .addCase(
        saveAndStartNewSession.fulfilled,
        (state, action) => {
          state.loading = false;

          const previousSessionId =
            state.currentSession?._id;

          const newSession =
            action.payload?.data
              ?.createNewcalculationSession;

          state.allSessions =
            state.allSessions.map((session) =>
              session._id === previousSessionId
                ? {
                    ...session,
                    status: "paused",
                  }
                : session,
            );

          state.currentSession = newSession || null;
          state.message =
            action.payload?.message || null;

          if (newSession) {
            state.allSessions = [
              newSession,
              ...state.allSessions.filter(
                (session) =>
                  session._id !== newSession._id,
              ),
            ];
          }
        },
      )

      .addCase(
        saveAndStartNewSession.rejected,
        (state, action) => {
          state.loading = false;
          state.error =
            action.payload ||
            "Unable to save the current session.";
        },
      )

      // Get all sessions
      .addCase(
        getAllSessionsOfUser.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        },
      )

      .addCase(
        getAllSessionsOfUser.fulfilled,
        (state, action) => {
          state.loading = false;

          const sessions =
            action.payload?.data?.getAllSessions || [];

          state.allSessions = sessions;

          state.currentSession =
            sessions.find(
              (session) => session.status === "open",
            ) || null;

          state.message =
            action.payload?.message || null;
        },
      )

      .addCase(
        getAllSessionsOfUser.rejected,
        (state, action) => {
          state.loading = false;
          state.error =
            action.payload ||
            "Unable to retrieve sessions.";
        },
      )

      // Reactivate session
      .addCase(
        reactivateSession.pending,
        (state, action) => {
          state.error = null;
          state.message = null;

          state.reactivatingSessionId =
            action.meta.arg.reactivateId;
        },
      )

      .addCase(
        reactivateSession.fulfilled,
        (state, action) => {
          const previousOpenSessionId =
            state.currentSession?._id;

          const reactivatedSession =
            action.payload?.data
              ?.updateRequestedSession;

          state.allSessions =
            state.allSessions.map((session) => {
              if (
                session._id === previousOpenSessionId
              ) {
                return {
                  ...session,
                  status: "paused",
                };
              }

              if (
                session._id ===
                reactivatedSession?._id
              ) {
                return {
                  ...session,
                  ...reactivatedSession,
                  status: "open",
                };
              }

              return session;
            });

          state.currentSession =
            reactivatedSession || null;

          state.reactivatingSessionId = null;

          state.message =
            action.payload?.message || null;
        },
      )

      .addCase(
        reactivateSession.rejected,
        (state, action) => {
          state.reactivatingSessionId = null;

          state.error =
            action.payload ||
            "Unable to reactivate the session.";
        },
      );
  },
});

export const {
  clearCalculationSessionMessage,
  clearCurrentSession,
} = calculationSessionSlice.actions;

export default calculationSessionSlice.reducer;