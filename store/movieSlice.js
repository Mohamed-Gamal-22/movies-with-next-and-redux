const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
import axios from "axios";

export const getMovies = createAsyncThunk("getMovies", async () => {
  let { data } = await axios.get(
    `https://api.themoviedb.org/3/trending/movie/day?api_key=941d7c8adac166c6d12ed7428eec2753`
  );
  return data;
});

const movieSlice = createSlice({
  name: "movieSlice",
  initialState: {
    movies: [],
    isLoading: false,
  },
  extraReducers: (builder) => {
    builder.addCase(getMovies.pending, (state, action) => {
      console.log(action);
    });
    builder.addCase(getMovies.fulfilled, (state, action) => {
      state.movies = action.payload;
    });
  },
});

export default movieSlice.reducer;
