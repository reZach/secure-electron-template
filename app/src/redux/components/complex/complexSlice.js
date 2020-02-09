import { createSlice } from "@reduxjs/toolkit";

const foods = ["pineapple", "kiwi", "grapes", "orange"];
const taste = ["great", "poor", "average", "good", "superb"];

const index = function(array){
    return Math.floor(Math.random() * array.length);
}
const randomFood = function(){
    return foods[index(foods)];
};
const randomTaste = function(){
    return taste[index(taste)];
}

const complexSlice = createSlice({
  name: "complex",
  initialState: [{
    id: 1,
    food: {
        name: "apple",
        taste: "great"
    }
  }],
  reducers: {
    add(state, action) {
      state.push({
          id: state.length + 1,
          food: {
              name: randomFood(),
              taste: randomTaste()
          }
      });
    },
    remove(state, action) {
        let index = Math.floor(Math.random() * state.length);
        state.splice(index, 1);
    }
  }
});

// Export actions
export const { add, remove } = complexSlice.actions;

// Export reducer
export default complexSlice.reducer;
