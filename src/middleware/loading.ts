import { createSlice } from "@reduxjs/toolkit";

interface ILoadingState {
  effects: { [key: string]: boolean };
  global: boolean;
}

const initialState: ILoadingState = {
  global: false,
  effects: {},
};
export const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    updateLoading: (state: any, action: any) => {
      const { payload } = action;
      state.effects[payload.key] = payload.value;
      if (Object.values(state.effects).some((value) => value)) {
        state.global = true;
        // 其他按操作
      } else {
        state.global = false;
        // 其他按操作
      }
    },
  },
});

export const selectLoading = (state: ILoadingState) => state;

export const { updateLoading } = loadingSlice.actions;
export default loadingSlice.reducer;
