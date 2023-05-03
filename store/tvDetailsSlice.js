const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
import axios from "axios";

export const getDetailsTv = createAsyncThunk("getDetailsOfTv", async (id) => {
  let { data } = await axios.get(
    `https://api.themoviedb.org/3/tv/${id}?api_key=941d7c8adac166c6d12ed7428eec2753&language=en-US`
  );
  return data;
});

const tvDetailsSlice = createSlice({
  name: "tvDetails",
  initialState: {
    detailsTv: null,
  },
  extraReducers: (builder) => {
    builder.addCase(getDetailsTv.fulfilled, (state, action) => {
      state.detailsTv = action.payload;
    });
  },
});

export default tvDetailsSlice.reducer;
