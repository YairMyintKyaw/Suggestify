import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  uid: "",
  boxes: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo: (state, { payload }) => {
      return { ...state, ...payload };
    },
  },
});

export const { setUserInfo } = userSlice.actions;
export default userSlice.reducer;
