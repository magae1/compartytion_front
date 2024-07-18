import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface JwtState {
  value: {
    access: string;
  };
}

const initJwt: JwtState = {
  value: {
    access: "",
  },
};

const jwtSlice = createSlice({
  name: "jwt",
  initialState: initJwt,
  reducers: {
    setAccessJwt: (state, action: PayloadAction<string>) => {
      state.value.access = action.payload;
    },
    clearJwt: (state) => {
      state.value = initJwt.value;
    },
  },
});

export const { setAccessJwt, clearJwt } = jwtSlice.actions;
export default jwtSlice.reducer;
