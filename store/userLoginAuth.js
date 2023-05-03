import axios from "axios";
import jwtDecode from "jwt-decode";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const checkLoginUser = createAsyncThunk(
  "userAuth/userLogin",
  async (user) => {
    const { data } = await axios.post(
      `https://sticky-note-fe.vercel.app/signin`,
      user
    );
    return data;
  }
);

const userLoginAuth = createSlice({
  name: "userLogin",
  initialState: {
    message: "",
    loading: false,
    userData:
      typeof window !== "undefined" ? localStorage.token
        ? jwtDecode(localStorage.getItem("token"))
        : null : null
  },
  extraReducers: (builder) => {
    builder.addCase(checkLoginUser.fulfilled, (state, action) => {
      state.message = action.payload.message;
      state.loading = false;
      if (action.payload.token) {
        let token = action.payload.token;
        let data = jwtDecode(token);
        state.userData = data;
      }
    });
    builder.addCase(checkLoginUser.rejected, (state, action) => {
      state.loading = false;
      console.log("rejected");
    });
  },
});

export default userLoginAuth.reducer;
