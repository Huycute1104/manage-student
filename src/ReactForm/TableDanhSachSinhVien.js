import React, { Component } from "react";
import { connect } from "react-redux";
import { xoaSinhVienAction } from "../redux/actions/BTQuanLySinhVienActions";
import Swal from "sweetalert2";

let profileContent = '';
class TableDanhSachSinhVien extends Component {

  render() {
    return (
      <div className="card">
        <div className="card-header bg-dark text-white">
          <h3>Danh sách sinh viên</h3>
        </div>
        <div className="card-body">
          <table className="table">
            <thead>
              <tr>
                <th>STT</th>
                <th>Mã SV</th>
                <th>Họ tên</th>
                <th>Email</th>
                <th>Số điện thoại</th>
                <th>Tùy chỉnh</th>
              </tr>
            </thead>
            <tbody>
              {this.props.mangSV.map((sinhVien, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{sinhVien.maSV}</td>
                    <td>{sinhVien.hoTen}</td>
                    <td>{sinhVien.email}</td>
                    <td>{sinhVien.soDienThoai}</td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => {
                          const action = xoaSinhVienAction(sinhVien.maSV);
                          this.props.dispatch(action);

                          Swal.fire({
                            title: 'Xóa thành công!',
                            html: profileContent,
                            icon: 'success',
                            confirmButtonText: 'OK'
                          })
                        }}
                      >
                        Xoá
                      </button>

                      <button
                        className="btn btn-primary mx-2"
                        onClick={() => {
                          const action = {
                            type: "CHINH_SUA_SINH_VIEN",
                            sinhVien: sinhVien,
                          };
                          this.props.dispatch(action);
                        }}
                      >
                        Chỉnh sửa
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    );
  }
}
const mapStateToProps = (rootReducer) => {
  return {
    mangSV: rootReducer.BTQuanLySVReducer.mangSV,
  };
};
export default connect(mapStateToProps)(TableDanhSachSinhVien);

