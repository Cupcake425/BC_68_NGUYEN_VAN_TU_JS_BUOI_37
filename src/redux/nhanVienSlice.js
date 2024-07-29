import { createSlice } from "@reduxjs/toolkit";
import { getValueLocalStorage } from "../util/util";

// Đề bài kêu áp dụng redux nhưng mỗi lần refresh page thì tất cả dữ liệu bay hết
// Cuối cùng cũng phải sử dụng localStorage
const initialState = {
  arrNhanVien: getValueLocalStorage("arrNhanVien") || [],
};

export const nhanVienSlice = createSlice({
  name: "nhan-vien",
  initialState,
  reducers: {
    themNhanVien: (state, action) => {
      state.arrNhanVien.push(action.payload);
    },
    xoaNhanVien: (state, action) => {
      state.arrNhanVien.splice(action.payload, 1);
    },
  },
});

// Action creators are generated for each case reducer function
export const { themNhanVien, xoaNhanVien } = nhanVienSlice.actions;

export default nhanVienSlice.reducer;
