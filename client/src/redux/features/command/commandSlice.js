import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import commandService from "./commandService";
import { toast } from "react-toastify";

const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  commands: [],
  command: [],
};

// Create New Command
export const createCommand = createAsyncThunk(
  "commands/create",
  async (formData, thunkAPI) => {
    try {
      return await commandService.createCommand(formData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get all Commands
export const getCommands = createAsyncThunk(
  "commands/getAll",
  async (_, thunkAPI) => {
    try {
      return await commandService.getCommands();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);
// Delete a Command
export const deleteCommand = createAsyncThunk(
  "commands/delete",
  async (id, thunkAPI) => {
    try {
      return await commandService.deleteCommand(id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get a Command
export const getCommand = createAsyncThunk(
  "commands/getCommand",
  async (id, thunkAPI) => {
    try {
      return await commandService.getCommand(id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);
// Update Command
export const updateCommand = createAsyncThunk(
  "commands/updateCommand",
  async ({ id, formData }, thunkAPI) => {
    try {
      return await commandService.updateCommand(id, formData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const commandSlice = createSlice({
  name: "Command",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCommand.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCommand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        console.log(action.payload);
        state.categories.push(action.payload);
        toast.success("Command added successfully");
      })
      .addCase(createCommand.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(getCommands.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCommands.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        console.log(action.payload);
        state.commands = action.payload;
      })
      .addCase(getCommands.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(deleteCommand.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCommand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success("Command deleted successfully");
      })
      .addCase(deleteCommand.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(getCommand.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCommand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.command = action.payload;
      })
      .addCase(getCommand.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(updateCommand.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCommand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success("Command updated successfully");
      })
      .addCase(updateCommand.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      });
  },
});
export const selectIsLoading = (state) => state.command.isLoading;
export const selectCommand = (state) => state.command.command;

export default commandSlice.reducer;
