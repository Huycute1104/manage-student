import React, { Component } from "react";
import { connect } from "react-redux";
import Swal from 'sweetalert2'


let profileContent = '';
let errorsContent = '';
class FormDangKy extends Component {
  state = {
    values: {
      maSV: "",
      hoTen: "",
      email: "",
      soDienThoai: "",
    },
    errors: {
      maSV: "",
      ten: "",
      email: "",
      soDienThoai: "",
    },
  };


  handleChangeInput = (event) => {
    let { name, value } = event.target;
  
    let newValues = { ...this.state.values };
    newValues[name] = value;
  
    let newErrors = { ...this.state.errors };
    let messError = "";
  
    if (value.trim() === "") {
      messError = " Field chưa có thông tin!!!";
    } else if (name === "soDienThoai") {
      const phoneRegex = /^\d{9,11}$/;
      if (!phoneRegex.test(value)) {
        messError = "Số điện thoại phải có từ 9 đến 11 chữ số!";
      }
    } else if (name === "email") {
      let regexEmail =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!regexEmail.test(value)) {
        messError = "Email không đúng định dạng!";
      }
    }
  
    newErrors[name] = messError;
  
    this.setState({
      values: newValues,
      errors: newErrors,
    });
  };
  

  handleSubmit = (event) => {
    event.preventDefault(); 
    let { values, errors } = this.state;
    let valid = true; 
    for (let key in values) {
      if (values[key] === "") {
        valid = false;
        break;
      }
    }
 
    for (let key in errors) {
      if (errors[key] !== "") {
        valid = false;
        break;
      }
    }
    if (!valid) {
      Swal.fire({
        title: 'Thông tin chưa đầy đủ!',
        html: errorsContent,
        icon: 'error', 
        confirmButtonText: 'OK'
    })
      return;
    }

    Swal.fire({
      title: 'Thêm thành công!',
      html: profileContent,
      icon: 'success', 
      confirmButtonText: 'OK'
  })

    const action = {
      type: "THEM_SINH_VIEN",
      sinhVien: this.state.values,
    };
    this.props.dispatch(action);

    this.setState({
      values: {
        maSV: "",
        hoTen: "",
        email: "",
        soDienThoai: "",
      },
    });
  };

  
  
  componentWillReceiveProps(newProps) {
    //Chạy khi props thay đổi
    this.setState({
      values: newProps.sinhVienChinhSua,
    });
  }

  render() {
    let { maSV, hoTen, email, soDienThoai } = this.state.values;
    console.log(this.props);
    return (
      <form onSubmit={this.handleSubmit} className="card mb-5">
        <div className="card-header bg-dark text-white">
          <h3>Thông tin sinh viên</h3>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-6">
              <div className="form-group">
                <p>Mã SV</p>
                <input
                  className="form-control"
                  id="maSV"
                  name="maSV"
                  onChange={this.handleChangeInput}
                  onBlur={this.handleChangeInput}
                  value={maSV}
                />
                <p className="text text-danger">{this.state.errors.maSV}</p>
              </div>
              <div className="form-group">
                <p>Email</p>
                <input
                  className="form-control"
                  id="email"
                  name="email"
                  type="email"
                  onChange={this.handleChangeInput}
                  onBlur={this.handleChangeInput}
                  value={email}
                />
                <p className="text text-danger">{this.state.errors.email}</p>
              </div>
            </div>
            <div className="col-6">
              <div className="form-group">
                <p>Họ tên</p>
                <input
                  className="form-control"
                  id="hoTen"
                  name="hoTen"
                  onChange={this.handleChangeInput}
                  onBlur={this.handleChangeInput}
                  value={hoTen}
                />
                <p className="text text-danger">{this.state.errors.hoTen}</p>
              </div>
              <div className="form-group">
                <p>Số điện thoại</p>
                <input
                  className="form-control"
                  id="soDienThoai"
                  name="soDienThoai"
                  onChange={this.handleChangeInput}
                  onBlur={this.handleChangeInput}
                  value={soDienThoai}
                />
                <p className="text text-danger">
                  {this.state.errors.soDienThoai}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="card-footer">
          <div className="form-group">
            <button type="submit" className="btn btn-success">
              Đăng ký
            </button>
            <button
              type="button"
              className="btn btn-primary mx-2"
              onClick={() => {
                const action = {
                  type: "CAP_NHAT_SINH_VIEN",
                  sinhVien: this.state.values,
                };
                Swal.fire({
                  title: 'Cập nhật thành công!',
                  html: profileContent,
                  icon: 'success',
                  confirmButtonText: 'OK'
              })
                this.props.dispatch(action);
                this.setState({
                  values: {
                    maSV: "",
                    hoTen: "",
                    email: "",
                    soDienThoai: "",
                  },
                });
              }}
            >
              Cập nhật
            </button>
          </div>
        </div>
      </form>
    );
  }
}

const mapStateToProps = (rootReducer) => {
  return {
    sinhVienChinhSua: rootReducer.BTQuanLySVReducer.sinhVienChinhSua,
  };
};

export default connect(mapStateToProps)(FormDangKy);
