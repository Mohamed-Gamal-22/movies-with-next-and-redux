const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
import axios from "axios";

export const getTrending = createAsyncThunk("getTrinding", async () => {
  let { data } = await axios.get(
    `https://api.themoviedb.org/3/trending/all/day?api_key=941d7c8adac166c6d12ed7428eec2753`
  );
  return data;
});
////////////////////////////////////////////////////////////////////////////

export const changeTrending = createAsyncThunk(
  "changeTrending",
  async (type = "all") => {
    let { data } = await axios.get(
      // console.log(type)
      `https://api.themoviedb.org/3/trending/${type}/day?api_key=941d7c8adac166c6d12ed7428eec2753`
    );
    return data;
  }
);

/////////////////////////////////////////////////////////////////////////////

const trendingSlice = createSlice({
  name: "trending",
  initialState: {
    trending: [],
    isLoading: false,
    dependTrending: [],
  },
  extraReducers: (builder) => {
    builder.addCase(getTrending.pending, (state, action) => {
      // console.log(action);
    });
    builder.addCase(getTrending.fulfilled, (state, action) => {
      state.trending = action.payload;
    });
    
    ////////////////////////////////////////////////////////////////////////

    builder.addCase(changeTrending.fulfilled, (state, action) => {
      state.dependTrending = action.payload;
    });
  },
});

export default trendingSlice.reducer;
