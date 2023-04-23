const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
import axios from "axios";

export const getTrending = createAsyncThunk("getTrinding", async () => {
  let { data } = await axios.get(
    `https://api.themoviedb.org/3/trending/all/day?api_key=941d7c8adac166c6d12ed7428eec2753`
  );
  return data;
});

const trendingSlice = createSlice({
  name: "trending",
  initialState: {
    trending: [],
    isLoading: false,
  },
  extraReducers: (builder) => {
    builder.addCase(getTrending.pending, (state, action) => {
      // console.log(action);
    });
    builder.addCase(getTrending.fulfilled, (state, action) => {
      state.trending = action.payload;
    });
  },
});

export default trendingSlice.reducer;
