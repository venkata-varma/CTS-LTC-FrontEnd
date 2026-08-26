import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  getIndividualChequeApi,
  getChequeWorkflowActivitiesApi,
  rescheduleChequeApi,
  submitChequeApi,
  updatePresentPlaceApi,
  recordChequeBounceApi,
  getChequeBounceCyclesApi,
  recordReturnedChequeReceiptApi,
  recordChequeRedepositApi ,
  addChequeNoteApi,
  recordChequeClearanceApi
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
// UPDATE CHEQUE PRESENT PLACE
// ========================================

export const updatePresentPlace = createAsyncThunk(
  "chequeTracking/updatePresentPlace",

  async ({ chequeId, presentPlaceData }, { rejectWithValue }) => {
    try {
      const response = await updatePresentPlaceApi(chequeId, presentPlaceData);

      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to update cheque present place",
      );
    }
  },
);

// ========================================
// RECORD CHEQUE BOUNCE
// ========================================

export const recordChequeBounce = createAsyncThunk(
  "chequeTracking/recordChequeBounce",

  async ({ chequeId, bounceData }, { rejectWithValue }) => {
    try {
      const response = await recordChequeBounceApi(chequeId, bounceData);

      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to record cheque bounce",
      );
    }
  },
);

// ========================================
// GET CHEQUE BOUNCE CYCLES
// ========================================

export const getChequeBounceCycles = createAsyncThunk(
  "chequeTracking/getChequeBounceCycles",

  async (chequeId, { rejectWithValue }) => {
    try {
      const response = await getChequeBounceCyclesApi(chequeId);

      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch cheque bounce cycles",
      );
    }
  },
);

// ========================================
// RECORD RETURNED CHEQUE RECEIPT
// ========================================

export const recordReturnedChequeReceipt = createAsyncThunk(
  "chequeTracking/recordReturnedChequeReceipt",

  async ({ bounceCycleId, receiptData }, { rejectWithValue }) => {
    try {
      const response = await recordReturnedChequeReceiptApi(
        bounceCycleId,
        receiptData,
      );

      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to record returned cheque receipt",
      );
    }
  },
);


// ========================================
// RECORD CHEQUE REDEPOSIT
// ========================================

export const recordChequeRedeposit = createAsyncThunk(
  "chequeTracking/recordChequeRedeposit",

  async (
    { bounceCycleId, redepositData },
    { rejectWithValue }
  ) => {
    try {
      const response = await recordChequeRedepositApi(
        bounceCycleId,
        redepositData
      );

      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to record cheque redeposit"
      );
    }
  }
);

// ========================================
// ADD CHEQUE NOTE
// ========================================

export const addChequeNote = createAsyncThunk(
  "chequeTracking/addChequeNote",

  async (
    { chequeId, noteData },
    { rejectWithValue }
  ) => {
    try {
      const response = await addChequeNoteApi(
        chequeId,
        noteData
      );

      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to add cheque note"
      );
    }
  }
);

// ========================================
// RECORD CHEQUE CLEARANCE
// ========================================

export const recordChequeClearance = createAsyncThunk(
  "chequeTracking/recordChequeClearance",

  async (
    { chequeId, clearanceData },
    { rejectWithValue }
  ) => {
    try {
      const response = await recordChequeClearanceApi(
        chequeId,
        clearanceData
      );

      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to record cheque clearance"
      );
    }
  }
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

  presentPlaceLoading: false,
  presentPlaceError: null,
  bounceLoading: false,
  bounceError: null,
  bounceCycles: [],
  bounceCyclesLoading: false,
  bounceCyclesError: null,

  returnedReceiptLoading: false,
  returnedReceiptError: null,
  redepositLoading: false,
redepositError: null,
noteLoading: false,
noteError: null,
clearanceLoading: false,
clearanceError: null,
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
      })

      // ====================================
      // UPDATE CHEQUE PRESENT PLACE
      // ====================================

      .addCase(updatePresentPlace.pending, (state) => {
        state.presentPlaceLoading = true;
        state.presentPlaceError = null;
      })

      .addCase(updatePresentPlace.fulfilled, (state, action) => {
        state.presentPlaceLoading = false;

        state.individualCheque =
          action.payload.data?.cheque || state.individualCheque;

        const newActivity = action.payload.data?.locationActivity;

        if (newActivity) {
          state.workflowActivities.push(newActivity);
        }
      })

      .addCase(updatePresentPlace.rejected, (state, action) => {
        state.presentPlaceLoading = false;
        state.presentPlaceError = action.payload;
      })
      // ====================================
      // RECORD CHEQUE BOUNCE
      // ====================================

      .addCase(recordChequeBounce.pending, (state) => {
        state.bounceLoading = true;
        state.bounceError = null;
      })

      .addCase(recordChequeBounce.fulfilled, (state, action) => {
        state.bounceLoading = false;

        state.individualCheque =
          action.payload.data?.cheque || state.individualCheque;

        const newActivity = action.payload.data?.bounceActivity;

        if (newActivity) {
          state.workflowActivities.push(newActivity);
        }
      })

      .addCase(recordChequeBounce.rejected, (state, action) => {
        state.bounceLoading = false;
        state.bounceError = action.payload;
      })
      // ====================================
      // GET CHEQUE BOUNCE CYCLES
      // ====================================

      .addCase(getChequeBounceCycles.pending, (state) => {
        state.bounceCyclesLoading = true;
        state.bounceCyclesError = null;
        state.bounceCycles = [];
      })

      .addCase(getChequeBounceCycles.fulfilled, (state, action) => {
        state.bounceCyclesLoading = false;

        state.bounceCycles = action.payload.data?.bounceCycles || [];
      })

      .addCase(getChequeBounceCycles.rejected, (state, action) => {
        state.bounceCyclesLoading = false;
        state.bounceCyclesError = action.payload;
      })
      // ====================================
      // RECORD RETURNED CHEQUE RECEIPT
      // ====================================

      .addCase(recordReturnedChequeReceipt.pending, (state) => {
        state.returnedReceiptLoading = true;
        state.returnedReceiptError = null;
      })

      .addCase(recordReturnedChequeReceipt.fulfilled, (state, action) => {
        state.returnedReceiptLoading = false;

        const updatedCheque = action.payload.data?.cheque;

        const updatedBounceCycle = action.payload.data?.bounceCycle;

        const newActivity = action.payload.data?.returnedReceiptActivity;

        // Update main cheque
        if (updatedCheque) {
          state.individualCheque = updatedCheque;
        }

        // Update only the corresponding bounce cycle
        if (updatedBounceCycle) {
          const bounceCycleIndex = state.bounceCycles.findIndex(
            (cycle) => cycle._id === updatedBounceCycle._id,
          );

          if (bounceCycleIndex !== -1) {
            state.bounceCycles[bounceCycleIndex] = updatedBounceCycle;
          }
        }

        // Add new workflow activity
        if (newActivity) {
          state.workflowActivities.push(newActivity);
        }
      })

      .addCase(recordReturnedChequeReceipt.rejected, (state, action) => {
        state.returnedReceiptLoading = false;
        state.returnedReceiptError = action.payload;
      })

      // ====================================
// RECORD CHEQUE REDEPOSIT
// ====================================

.addCase(recordChequeRedeposit.pending, (state) => {
  state.redepositLoading = true;
  state.redepositError = null;
})

.addCase(recordChequeRedeposit.fulfilled, (state, action) => {
  state.redepositLoading = false;

  const updatedCheque = action.payload.data?.cheque;

  const updatedBounceCycle =
    action.payload.data?.bounceCycle;

  const newActivity =
    action.payload.data?.redepositActivity;

  // Update main cheque
  if (updatedCheque) {
    state.individualCheque = updatedCheque;
  }

  // Update the corresponding bounce cycle
  if (updatedBounceCycle) {
    const bounceCycleIndex =
      state.bounceCycles.findIndex(
        (cycle) =>
          cycle._id === updatedBounceCycle._id
      );

    if (bounceCycleIndex !== -1) {
      state.bounceCycles[bounceCycleIndex] =
        updatedBounceCycle;
    }
  }

  // Add workflow activity
  if (newActivity) {
    state.workflowActivities.push(newActivity);
  }
})

.addCase(recordChequeRedeposit.rejected, (state, action) => {
  state.redepositLoading = false;
  state.redepositError = action.payload;
})

// ====================================
// ADD CHEQUE NOTE
// ====================================

.addCase(addChequeNote.pending, (state) => {
  state.noteLoading = true;
  state.noteError = null;
})

.addCase(addChequeNote.fulfilled, (state, action) => {
  state.noteLoading = false;

  const newActivity =
    action.payload.data?.noteActivity;

  if (newActivity) {
    state.workflowActivities.push(newActivity);
  }
})

.addCase(addChequeNote.rejected, (state, action) => {
  state.noteLoading = false;
  state.noteError = action.payload;
})


// ====================================
// RECORD CHEQUE CLEARANCE
// ====================================

.addCase(recordChequeClearance.pending, (state) => {
  state.clearanceLoading = true;
  state.clearanceError = null;
})

.addCase(recordChequeClearance.fulfilled, (state, action) => {
  state.clearanceLoading = false;

  const updatedCheque =
    action.payload.data?.cheque;

  const newActivity =
    action.payload.data?.clearanceActivity;

  // Update main cheque
  if (updatedCheque) {
    state.individualCheque = updatedCheque;
  }

  // Add clearance activity to workflow
  if (newActivity) {
    state.workflowActivities.push(newActivity);
  }
})

.addCase(recordChequeClearance.rejected, (state, action) => {
  state.clearanceLoading = false;
  state.clearanceError = action.payload;
})
  },
});

export default chequeTrackingSlice.reducer;
