import axios, { AxiosResponse } from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

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

interface CharactersResponse {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: Character[];
}

interface Location {
  name: string;
}

export const getAllCharacters = createAsyncThunk(
  'getAllChar/fetchAll',
  async (statusFilters?: string[]): Promise<CharactersResponse> => {
    const statusQuery = statusFilters ? statusFilters.map(status => `status=${status}`).join('&') : '';
    const url = `https://rickandmortyapi.com/api/character?${statusQuery}`;
    const response: AxiosResponse<CharactersResponse> = await axios.get(url);
    return response.data;
  }
);

export const getAllLocations = createAsyncThunk('getAllLocations/fetchAll', async (): Promise<Location[]> => {
  const response: AxiosResponse<{ results: Location[] }> = await axios.get("https://rickandmortyapi.com/api/location");
  return response.data.results;
});
