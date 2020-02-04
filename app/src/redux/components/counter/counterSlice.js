import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",
  initialState: {
    value: 0
  },
  reducers: {
    increment(state, action) {
      state.value++;
    },
    decrement(state, action) {
      state.value--;
    }
  }
});

// Export actions
export const { increment, decrement } = counterSlice.actions;

// Export reducer
export default counterSlice.reducer;
