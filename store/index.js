import { configureStore } from "@reduxjs/toolkit";
import userAuthSlice from "./userAuthSlice";
import movieSlice from "./movieSlice";
import tvShowsSlice from "./tvShows";
import trendingSlice from "./trendingSlice";

const store = configureStore({
  reducer: {
    userAuthSlice,
    movieSlice,
    tvShowsSlice,
    trendingSlice,
  },
});

export default store;
