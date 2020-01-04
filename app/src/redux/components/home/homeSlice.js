import {
  createSlice
} from "@reduxjs/toolkit";

const homeSlice = createSlice({
  name: "home",
  initialState: {
    message: "Hello and welcome to the template!"
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