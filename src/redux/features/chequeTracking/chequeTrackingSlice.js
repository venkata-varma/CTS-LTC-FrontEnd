import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  getIndividualChequeApi,
  getChequeWorkflowActivitiesApi,
  rescheduleChequeApi,
  submitChequeApi,
} from "./chequeTrackingApi";

// ========================================
// GET INDIVIDUAL CHEQUE
// ========================================

export const getIndividualCheque = createAsyncThunk(
  "chequeTracking/getIndividualCheque",

  async (chequeId, { rejectWithValue }) => {
    try {
      const response = await getIndividualChequeApi(chequeId);

      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch cheque details",
      );
    }
  },
);

// ========================================
// GET CHEQUE WORKFLOW ACTIVITIES
// ========================================

export const getChequeWorkflowActivities = createAsyncThunk(
  "chequeTracking/getChequeWorkflowActivities",

  async (chequeId, { rejectWithValue }) => {
    try {
      const response = await getChequeWorkflowActivitiesApi(chequeId);

      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch cheque workflow activities",
      );
    }
  },
);

// ========================================
// RESCHEDULE CHEQUE
// ========================================

export const rescheduleCheque = createAsyncThunk(
  "chequeTracking/rescheduleCheque",

  async ({ chequeId, rescheduleData }, { rejectWithValue }) => {
    try {
      const response = await rescheduleChequeApi(chequeId, rescheduleData);

      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to reschedule cheque",
      );
    }
  },
);

// ========================================
// SUBMIT CHEQUE FOR FIRST TIME
// ========================================

export const submitCheque = createAsyncThunk(
  "chequeTracking/submitCheque",

  async ({ chequeId, submissionData }, { rejectWithValue }) => {
    try {
      const response = await submitChequeApi(chequeId, submissionData);

      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to record cheque submission",
      );
    }
  },
);
// ========================================
// INITIAL STATE
// ========================================

const initialState = {
  individualCheque: null,

  workflowActivities: [],

  chequeLoading: false,
  chequeError: null,

  activitiesLoading: false,
  activitiesError: null,

  rescheduleLoading: false,
  rescheduleError: null,
  submissionLoading: false,
  submissionError: null,
};

// ========================================
// SLICE
// ========================================

const chequeTrackingSlice = createSlice({
  name: "chequeTracking",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      // ====================================
      // INDIVIDUAL CHEQUE
      // ====================================

      .addCase(getIndividualCheque.pending, (state) => {
        state.chequeLoading = true;
        state.chequeError = null;
      })

      .addCase(getIndividualCheque.fulfilled, (state, action) => {
        state.chequeLoading = false;

        state.individualCheque = action.payload.data?.getInvidualCheque || null;
      })
      .addCase(getIndividualCheque.rejected, (state, action) => {
        state.chequeLoading = false;

        state.chequeError = action.payload;
      })

      // ====================================
      // WORKFLOW ACTIVITIES
      // ====================================

      .addCase(getChequeWorkflowActivities.pending, (state) => {
        state.activitiesLoading = true;
        state.activitiesError = null;
        // Clear previous cheque's data while new cheque is loading
        state.individualCheque = null;
        state.workflowActivities = [];
      })

      .addCase(getChequeWorkflowActivities.fulfilled, (state, action) => {
        state.activitiesLoading = false;

        state.individualCheque = action.payload.data?.cheque || null;

        state.workflowActivities =
          action.payload.data?.workflowActivities || [];
      })

      .addCase(getChequeWorkflowActivities.rejected, (state, action) => {
        state.activitiesLoading = false;

        state.activitiesError = action.payload;
      })

      // ====================================
      // RESCHEDULE CHEQUE
      // ====================================

      .addCase(rescheduleCheque.pending, (state) => {
        state.rescheduleLoading = true;
        state.rescheduleError = null;
      })

      .addCase(rescheduleCheque.fulfilled, (state, action) => {
        state.rescheduleLoading = false;

        state.individualCheque =
          action.payload.data?.cheque || state.individualCheque;

        const newActivity = action.payload.data?.rescheduleActivity;

        if (newActivity) {
          state.workflowActivities.push(newActivity);
        }
      })

      .addCase(rescheduleCheque.rejected, (state, action) => {
        state.rescheduleLoading = false;
        state.rescheduleError = action.payload;
      })
      // ====================================
      // SUBMIT CHEQUE FOR FIRST TIME
      // ====================================

      .addCase(submitCheque.pending, (state) => {
        state.submissionLoading = true;
        state.submissionError = null;
      })

      .addCase(submitCheque.fulfilled, (state, action) => {
        state.submissionLoading = false;

        state.individualCheque =
          action.payload.data?.cheque || state.individualCheque;

        const newActivity = action.payload.data?.submissionActivity;

        if (newActivity) {
          state.workflowActivities.push(newActivity);
        }
      })

      .addCase(submitCheque.rejected, (state, action) => {
        state.submissionLoading = false;
        state.submissionError = action.payload;
      });
  },
});

export default chequeTrackingSlice.reducer;
