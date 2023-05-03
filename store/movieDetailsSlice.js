const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
import axios from "axios";
/////////////////////////////////////////////////////////////////////////////

export const getDetailsMovie = createAsyncThunk(
  "getDetailsOfMovies",
  async (id) => {
    let { data } = await axios.get(
      // console.log(type)
      `https://api.themoviedb.org/3/movie/${id}?api_key=941d7c8adac166c6d12ed7428eec2753&language=en-US`
    );
    return data;
  }
);
/////////////////////////////////////////////////////////////////////////////
export const getMovieVideo = createAsyncThunk(
  "getMovieVideo",
  async (id) => {
    let { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/videos?api_key=941d7c8adac166c6d12ed7428eec2753&language=en-US`
    );
    return data;
  }
);
/////////////////////////////////////////////////////////////////////////////

const movieDetailsSlice = createSlice({
  name: "movieDetails",
  initialState: {
    detailsMovie: null,
    movieVideo : null
  },
  extraReducers: (builder) => {
    builder.addCase(getDetailsMovie.fulfilled, (state, action) => {
      state.detailsMovie = action.payload;
    });
    //////////////////////////////////////////////////////////////////////
    builder.addCase(getMovieVideo.fulfilled, (state, action) => {
      state.movieVideo = action.payload;
    });
  },
});

export default movieDetailsSlice.reducer;
