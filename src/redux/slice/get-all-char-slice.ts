// slices/getAllCharSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getAllCharacters } from "@/api";

interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
}

interface GetAllCharState {
  data: Character[] | null;
  isLoading: boolean;
  error?: string | null;
}

const initialState: GetAllCharState = {
  data: null,
  isLoading: false,
  error: null,
};

export const getAllCharSlice = createSlice({
  name: "getAllChar",
  initialState,
  reducers: {
    resetGetAllChar: (state) => {
      state.data = null;
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllCharacters.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllCharacters.fulfilled, (state, action: PayloadAction<CharactersResponse>) => {
        state.isLoading = false;
        state.data = action.payload.results;
        state.error = null;
      })
      .addCase(getAllCharacters.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Unknown error occurred.";
      });
  },
});

export const { resetGetAllChar } = getAllCharSlice.actions;

export default getAllCharSlice.reducer;
