import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { createProduct } from "../product/productSlice";
import {
  createGroupApi,
  getAllGroupsOfSessionApi,
  updateGroupApi,
  deleteGroupApi,
} from "./groupApi";

export const createGroup = createAsyncThunk(
  "group/createGroup",
  async (payload, thunkAPI) => {
    try {
      return await createGroupApi(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const getAllGroupsOfSession = createAsyncThunk(
  "group/getAllGroupsOfSession",
  async (calculationSessionId, thunkAPI) => {
    try {
      return await getAllGroupsOfSessionApi(calculationSessionId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const updateGroup = createAsyncThunk(
  "group/updateGroup",
  async ({ groupId, payload }, thunkAPI) => {
    try {
      return await updateGroupApi(groupId, payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const deleteGroup = createAsyncThunk(
  "group/deleteGroup",
  async (groupId, thunkAPI) => {
    try {
      return await deleteGroupApi(groupId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

const initialState = {
  allGroups: [],

  loading: false,

  error: null,
};

const groupSlice = createSlice({
  name: "group",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      // Create Group

      .addCase(createGroup.pending, (state) => {
        state.loading = true;

        state.error = null;
      })

      .addCase(createGroup.fulfilled, (state) => {
        state.loading = false;
      })

      .addCase(createGroup.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      })

      // Product created successfully
      // Update only the affected group in Redux

      .addCase(createProduct.fulfilled, (state, action) => {
        const updatedGroup = action.payload.data.updateGroup;

        const groupIndex = state.allGroups.findIndex(
          (group) => group._id === updatedGroup._id,
        );

        if (groupIndex !== -1) {
          state.allGroups[groupIndex] = updatedGroup;
        }
      })
      // Get All Groups

      .addCase(getAllGroupsOfSession.pending, (state) => {
        state.loading = true;

        state.error = null;
      })

      .addCase(getAllGroupsOfSession.fulfilled, (state, action) => {
        state.loading = false;

        state.allGroups = action.payload.data.getAllGroups;
      })

      .addCase(getAllGroupsOfSession.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      })
      // Update Group

      .addCase(updateGroup.pending, (state) => {
        state.loading = true;

        state.error = null;
      })

      .addCase(updateGroup.fulfilled, (state) => {
        state.loading = false;
      })

      .addCase(updateGroup.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      })

      // Delete Group

      .addCase(deleteGroup.pending, (state) => {
        state.loading = true;

        state.error = null;
      })

      .addCase(deleteGroup.fulfilled, (state) => {
        state.loading = false;
      })

      .addCase(deleteGroup.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      });
  },
});

export default groupSlice.reducer;
