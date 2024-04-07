import { XOA_SINH_VIEN } from "./types/BTQuanLySinhVienTypes"

//Khai báo action
export const xoaSinhVienAction = (maSV) => {
    return {
        type: XOA_SINH_VIEN,
        maSV: maSV
    }
}