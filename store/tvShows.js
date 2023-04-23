const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
import axios from "axios";

export const getTvShows = createAsyncThunk("getTvShows", async () => {
  let { data } = await axios.get(
    `https://api.themoviedb.org/3/trending/tv/day?api_key=941d7c8adac166c6d12ed7428eec2753`
  );
  return data;
});

const tvShowsSlice = createSlice({
  name: "tvShows",
  initialState: {
    tv: [],
    isLoading: false,
  },
  extraReducers: (builder) => {
    builder.addCase(getTvShows.pending, (state, action) => {
      console.log(action);
    });
    builder.addCase(getTvShows.fulfilled, (state, action) => {
      state.tv = action.payload;
    });
  },
});

export default tvShowsSlice.reducer;
