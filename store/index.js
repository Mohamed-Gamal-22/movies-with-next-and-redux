import { configureStore } from "@reduxjs/toolkit";
import userAuthSlice from "./userAuthSlice";
import movieSlice from "./movieSlice";
import tvShowsSlice from "./tvShows";
import trendingSlice from "./trendingSlice";
import userLoginAuth from "./userLoginAuth";
import movieDetailsSlice from "./movieDetailsSlice";
import tvDetailsSlice from "./tvDetailsSlice";
import personSlice from "./personSlice";

const store = configureStore({
  reducer: {
    userAuthSlice,
    userLoginAuth,
    movieSlice,
    movieDetailsSlice,
    tvShowsSlice,
    tvDetailsSlice,
    trendingSlice,
    personSlice,
  },
});

export default store;
