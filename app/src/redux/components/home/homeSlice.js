import {
  createSlice
} from "@reduxjs/toolkit";

const homeSlice = createSlice({
  name: "home",
  initialState: {
    message: "hello world"
  },
  reducers: {
    changeMessage(state, action) {
      state.message = action.payload.message;
    }
  }
});

// Export actions
export const {
  changeMessage
} = homeSlice.actions;

// Export reducer
export default homeSlice.reducer;