import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  getIndividualChequeApi,
  getChequeWorkflowActivitiesApi,
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
// INITIAL STATE
// ========================================

const initialState = {
  individualCheque: null,

  workflowActivities: [],

  chequeLoading: false,
  chequeError: null,

  activitiesLoading: false,
  activitiesError: null,
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
      })

      .addCase(getChequeWorkflowActivities.fulfilled, (state, action) => {
        state.activitiesLoading = false;

        state.workflowActivities =
          action.payload.data?.workflowActivities || [];
      })

      .addCase(getChequeWorkflowActivities.rejected, (state, action) => {
        state.activitiesLoading = false;

        state.activitiesError = action.payload;
      });
  },
});

export default chequeTrackingSlice.reducer;
