import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",
  initialState: {
    value: 0
  },
  reducers: {
    increment(state, _action) {
      state.value++;
    },
    decrement(state, _action) {
      state.value--;
    }
  }
});

// Export actions
export const { increment, decrement } = counterSlice.actions;

// Export reducer
export default counterSlice.reducer;
