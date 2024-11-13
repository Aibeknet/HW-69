import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

interface Show {
  id: number;
  name: string;
  premiered: string;
  summary: string;
  image?: { original: string };
}

interface ShowsState {
  searchShows: Show[];
  showInfo: Show | null;
  isLoading: boolean;
  error: boolean;
  searchTerm: '',
}

const initialState: ShowsState = {
  searchShows: [],
  showInfo: null,
  isLoading: false,
  error: false,
  searchTerm: '',
}

export const fetchShows = createAsyncThunk(
  'shows/fetchShows',
  async (term: string): Promise<Show[]> => {
    const response = await axios.get(`http://api.tvmaze.com/search/shows?q=${term}`);
    return response.data.map((item: {show: Show}) => item.show)
  }
);

export const fetchShowInfo = createAsyncThunk(
  'shows/fetchShowInfo',
  async (id: number): Promise<Show> => {
    const response = await axios.get(`http://api.tvmaze.com/shows/${id}`);
    return response.data;
  }
);

const showsSlice = createSlice({
  name: 'shows',
  initialState,
  reducers: {
    resetShowInfo: (state) => {
      state.showInfo = null;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchShows.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(fetchShows.fulfilled, (state, action) => {
        state.isLoading = false;
        state.searchShows = action.payload;
        state.error = false;
      })
      .addCase(fetchShows.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      })
      .addCase(fetchShowInfo.fulfilled, (state, action) => {
        state.showInfo = action.payload;
      });
  },
});

export const { resetShowInfo, setSearchTerm } = showsSlice.actions;
export default showsSlice.reducer;