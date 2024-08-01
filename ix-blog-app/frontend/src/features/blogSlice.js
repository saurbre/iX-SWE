import blogService from "../services/blogsService";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  blog: null,
  blogs: [],
  addBlog: null,
  editBlog: null,
  deleteBlog: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const fetchBlogs = createAsyncThunk(
    "blogs/fetchBlogs",
    async (_, thunkAPI) => {
        try {
        return await blogService.fetchBlogs();
        } catch (error) {
        const message = error.message || error;
        return thunkAPI.rejectWithValue(message);
        }
    }
);

export const fetchBlogsByCategoryId = createAsyncThunk(
    "blogs/fetchBlogsByCategoryId",
    async (categoryId, thunkAPI) => {
        try {
        return await blogService.fetchBlogsByCategoryId(categoryId);
        } catch (error) {
        const message = error.message || error;
        return thunkAPI.rejectWithValue(message);
        }
    }
);

export const createBlog = createAsyncThunk(
    "blogs/createBlog",
    async (blog, thunkAPI) => {
        try {
          return await blogService.createBlog(blog);
        } catch (error) {
          const message = error.message || error;
          return thunkAPI.rejectWithValue(message);
        }
    }
);

export const updateBlog = createAsyncThunk(
    "blogs/updateBlog",
    async (blog, thunkAPI) => {
        try {
        return await blogService.updateBlog(blog);
        } catch (error) {
        const message = error.message || error;
        return thunkAPI.rejectWithValue(message);
        }
    }
);

export const blogsSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    reset: (state) => initialState,

    resetErrorStatus: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },

    setBlogs: (state, action) => {
      state.blogs = action.payload;
    },

    setAddBlog: (state, action) => {
      state.addBlog = action.payload;
    },

    setEditBlog: (state, action) => {
      state.editBlog = action.payload;
    },

    setDeleteBlog: (state, action) => {
      state.deleteBlog = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBlogs.fulfilled, (state, action) => {
      state.blogs = action.payload.data;
      state.isLoading = false;
      state.message = action.payload.message;
      state.isSuccess = false; // no pop-up
    });
    builder.addCase(fetchBlogs.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchBlogs.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false; 
      state.isError = true;
      state.message = action.payload.message;
    });

    builder.addCase(fetchBlogsByCategoryId.fulfilled, (state, action) => {
      state.blogs = action.payload.data;
      state.isLoading = false;
      state.message = action.payload.message;
      state.isSuccess = false; // no pop-up
    });
    builder.addCase(fetchBlogsByCategoryId.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchBlogsByCategoryId.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.message = action.payload.message;
    });

    builder.addCase(createBlog.fulfilled, (state, action) => {
      state.blogs.push(action.payload.data);
      state.isLoading = false;
      state.message = action.payload.message;
      state.isSuccess = true;
      state.addBlog = null;
    });
    builder.addCase(createBlog.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(createBlog.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.message = action.payload.message;
    });
  },
});

export const { reset, resetErrorStatus, setBlogs, setAddBlog, setEditBlog, setDeleteBlog } = blogsSlice.actions;
export default blogsSlice.reducer;