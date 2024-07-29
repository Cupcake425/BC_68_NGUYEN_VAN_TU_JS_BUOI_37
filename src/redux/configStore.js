import { configureStore } from "@reduxjs/toolkit";
import nhanVienSlice from "./nhanVienSlice";

export const store = configureStore({
  reducer: { nhanVienSlice },
});
