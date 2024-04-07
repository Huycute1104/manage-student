import { XOA_SINH_VIEN } from "../actions/types/BTQuanLySinhVienTypes";

const stateDefault = {
  mangSV: [],

  sinhVienChinhSua: {
    maSV: "",
    hoTen: "",
    email: "",
    soDienThoai: "",
  },
};

export const BTQuanLySVReducer = (state = stateDefault, action) => {

  switch (action.type) {
    case "THEM_SINH_VIEN": {
      state.mangSV = [...state.mangSV, action.sinhVien];
      return { ...state };
    }
    case XOA_SINH_VIEN: {

      state.mangSV = [
        ...state.mangSV.filter((sinhVien) => sinhVien.maSV !== action.maSV),
      ];
      return { ...state };
    }

    case "CHINH_SUA_SINH_VIEN": {
      state.sinhVienChinhSua = action.sinhVien;

      return { ...state };
    }

    case "CAP_NHAT_SINH_VIEN": {
      let sinhVien = state.mangSV.find(
        (sinhVien) => sinhVien.maSV === action.sinhVien.maSV
      );
      if (sinhVien) {
        for (let key in action.sinhVien) {
          sinhVien[key] = action.sinhVien[key];
        }
      }

      state.mangSV = [...state.mangSV];

      return { ...state };
    }

    default:
      return state;
  }
};
