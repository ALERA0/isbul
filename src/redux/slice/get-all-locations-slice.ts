import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getAllLocations } from "@/api";

interface Location {
  name: string;
}

interface GetAllLocationsState {
  data: Location[] | null;
  isLoading: boolean;
  error?: string | null;
}

const initialState: GetAllLocationsState = {
  data: null,
  isLoading: false,
  error: null,
};

export const getAllLocationsSlice = createSlice({
  name: "getAllLocations",
  initialState,
  reducers: {
    resetGetAllLocations: (state) => {
      state.data = null;
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllLocations.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllLocations.fulfilled, (state, action: PayloadAction<Location[]>) => {
        state.isLoading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(getAllLocations.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Unknown error occurred.";
      });
  },
});

export const { resetGetAllLocations } = getAllLocationsSlice.actions;

export default getAllLocationsSlice.reducer;
