const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
import axios from "axios";

export const getPerson = createAsyncThunk("getPerson", async (personId) => {
  let { data } = await axios.get(
    `https://api.themoviedb.org/3/person/${personId}?api_key=941d7c8adac166c6d12ed7428eec2753&language=en-US`
  );
  return data;
});

const personSlice = createSlice({
  name: "personSlice",
  initialState: {
    person: {},
    isLoading: false,
  },
  extraReducers: (builder) => {
    builder.addCase(getPerson.fulfilled, (state, action) => {
      state.person = action.payload;
    });
  },
});

export default personSlice.reducer;
