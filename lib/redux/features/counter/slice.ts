import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { actionRequest, NAME } from "@/lib/redux/features/counter/saga";

const slice = createSlice({
  name: NAME,
  initialState: {
    value: 0,
  },
  reducers: {
    initializeCount: (state, action: PayloadAction<number>) => {
      state.value = action.payload;
    },
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
  },
});

export const incrementAsync = actionRequest;

export const { initializeCount, decrement, increment } = slice.actions;
export default slice.reducer;
