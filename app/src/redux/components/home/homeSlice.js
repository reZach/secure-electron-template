import { createSlice } from "@reduxjs/toolkit";

const homeSlice = createSlice({
  name: "home",
  initialState: {
    message:
      typeof window.api.store.initial()["motd"] !== "undefined"
        ? window.api.store.initial()["motd"]
        : "Hello and welcome to the template!"
  },
  reducers: {
    changeMessage(state, action) {
      state.message = action.payload;
    }
  }
});

// Export actions
export const { changeMessage } = homeSlice.actions;

// Export reducer
export default homeSlice.reducer;
