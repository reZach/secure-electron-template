import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",
  initialState: {
    value: 0,
    complex: [{
      "a": 1,
      "b": 2
    }]
  },
  reducers: {
    increment(state, action) {
      state.value++;
    },
    decrement(state, action) {
      state.value--;
    },
    rando(state, action){
      let rand = Math.floor(Math.random() * 3);
      
      if (rand === 0){
        state.complex.push({
          a: 4
        });
      } else if (rand === 1){
        state.complex.push({
          a: 23
        });
      } else if (rand === 2){
        state.complex[0].a = 15;
      }
    }
  }
});

// Export actions
export const { increment, decrement, rando } = counterSlice.actions;

// Export reducer
export default counterSlice.reducer;
