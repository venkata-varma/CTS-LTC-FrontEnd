import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  createProductApi,
  getProductsOfGroupApi,
  updateProductApi,
  getProductsOfSessionApi,
    deleteProductApi,
} from "./productApi";

export const createProduct = createAsyncThunk(
  "product/createProduct",
  async (payload, thunkAPI) => {
    try {
      return await createProductApi(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const getProductsOfGroup = createAsyncThunk(
  "product/getProductsOfGroup",
  async (groupId, thunkAPI) => {
    try {
      return await getProductsOfGroupApi(groupId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const getProductsOfSession = createAsyncThunk(
  "product/getProductsOfSession",

  async (calculationSessionId, thunkAPI) => {
    try {
      return await getProductsOfSessionApi(calculationSessionId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async ({ productId, payload }, thunkAPI) => {
    try {
      return await updateProductApi(productId, payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (productId, thunkAPI) => {
    try {
      return await deleteProductApi(productId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

const initialState = {
  allProducts: [],

  productsByGroup: {},

  loading: false,

  error: null,
};

const productSlice = createSlice({
  name: "product",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      // Create Product

      .addCase(createProduct.pending, (state) => {
        state.loading = true;

        state.error = null;
      })

      .addCase(createProduct.fulfilled, (state) => {
        state.loading = false;
      })

      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      })

      // Get Products

      .addCase(getProductsOfGroup.pending, (state) => {
        state.loading = true;

        state.error = null;
      })

      .addCase(getProductsOfGroup.fulfilled, (state, action) => {
        state.loading = false;

        state.allProducts = action.payload.data.getAllProducts;
      })

      .addCase(getProductsOfGroup.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      })

      // Get Products Of Session

      .addCase(getProductsOfSession.pending, (state) => {
        state.loading = true;

        state.error = null;
      })

      .addCase(getProductsOfSession.fulfilled, (state, action) => {
        state.loading = false;

        const groupedProducts = {};

        action.payload.data.getProductsOfSession.forEach((product) => {
          const groupId = product.groupId;

          if (!groupedProducts[groupId]) {
            groupedProducts[groupId] = [];
          }

          groupedProducts[groupId].push(product);
        });

        state.productsByGroup = groupedProducts;
      })

      .addCase(getProductsOfSession.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      })
      // Update Product

      .addCase(updateProduct.pending, (state) => {
        state.loading = true;

        state.error = null;
      })

      .addCase(updateProduct.fulfilled, (state) => {
        state.loading = false;
      })

      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      })

      // Delete Product

      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;

        state.error = null;
      })

      .addCase(deleteProduct.fulfilled, (state) => {
        state.loading = false;
      })

      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;
