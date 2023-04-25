import { configureStore } from "@reduxjs/toolkit";
import userAuthSlice from "./userAuthSlice";
import movieSlice from "./movieSlice";
import tvShowsSlice from "./tvShows";
import trendingSlice from "./trendingSlice";
import userLoginAuth from "./userLoginAuth";

const store = configureStore({
  reducer: {
    userAuthSlice,
    movieSlice,
    tvShowsSlice,
    trendingSlice,
    userLoginAuth,
  },
});

export default store;
