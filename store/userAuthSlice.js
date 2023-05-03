import axios from "axios";
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const checkRegisterUser = createAsyncThunk(
  "userAuth/checkRegister",
  async (user) => {
    const { data } = await axios.post(
      `https://sticky-note-fe.vercel.app/signup`,
      user
    );
    return data;
  }
);

const userAuthSlice = createSlice({
  name: "userAuth",
  initialState: {
    message: "",
    loading: false,
  },
  extraReducers: (builder) => {
    // builder.addCase(checkRegisterUser.pending, (state, action) => {
    //   state.loading = true;
    //   console.log(action);
    // });
    builder.addCase(checkRegisterUser.fulfilled, (state, action) => {
      state.message = action.payload.message;
      state.loading = false;
    });
    // builder.addCase(checkRegisterUser.rejected, (state, action) => {
    //   console.log(action);
    //   state.loading = false;
    //   console.log("regected");
    // });
  },
});

export default userAuthSlice.reducer;
