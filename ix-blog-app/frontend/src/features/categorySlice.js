import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import categoryService from "../services/categoryService";

const initialState = {
  categories: [],
  addCategory: null,
  editCategory: null,
  deleteCategory: null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories", 
  async (_, thunkAPI) => {
    try {
      return await categoryService.getCategories();
    } catch (error) {
      const message = error.message || error;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const createCategory = createAsyncThunk(
  "categories/createCategory",
  async (category, thunkAPI) => {
    try {
      return await categoryService.createCategory(category);
    } catch (error) {
      const message = error.message || error;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateCategory = createAsyncThunk(
  "categories/updateCategory",
  async (category, thunkAPI) => {
    try {
      return await categoryService.updateCategory(category);
    } catch (error) {
      const message = error.message || error;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    reset: (state) => initialState,
    
    resetError: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },

    setCategories: (state, action) => {
      state.categories = action.payload;
    },

    setAddCategory: (state, action) => {
      state.addCategory = action.payload;
    },

    setEditCategory: (state, action) => {
      state.editCategory = action.payload;
    },

    setDeleteCategory: (state, action) => {
      state.deleteCategory = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.categories = action.payload.data;
      state.isLoading = false;
      state.message = action.payload.message;
      state.isSuccess = false; // no pop-up
    });
    builder.addCase(fetchCategories.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchCategories.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false; 
      state.isError = true;
      state.message = action.payload.message;
    });

    builder.addCase(createCategory.fulfilled, (state, action) => {
      state.categories.push(action.payload.data);
      state.isLoading = false;
      state.message = action.payload.message;
      state.isSuccess = true;
      state.addCategory = null;
    });
      builder.addCase(createCategory.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(createCategory.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false; 
      state.isError = true;
      state.message = action.payload.message;
    });

    builder.addCase(updateCategory.fulfilled, (state, action) => {
      state.categories = categoryService.getCategories();
      state.isLoading = false;
      state.message = action.payload.message;
      state.isSuccess = true;
      state.editCategory = null;
    });
      builder.addCase(updateCategory.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(updateCategory.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false; 
      state.isError = true;
      state.message = action.payload.message;
    });
  },
});

export const { reset, resetError, setCategories, setAddCategory, setEditCategory, setDeleteCategory } = categorySlice.actions;
export default categorySlice.reducer;